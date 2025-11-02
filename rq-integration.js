// RQ Integration Module for Verizon Sales Finder
// Integration with iQmetrix RQ Retail Management System

class RQIntegration {
    constructor() {
        this.apiEndpoint = null; // Set this to your RQ API endpoint
        this.apiKey = null; // Set this in settings
        this.storeId = null; // Your store ID
        this.employeeId = null; // Your employee ID
        this.companyId = null; // Your company ID

        this.loadSettings();
    }

    loadSettings() {
        const settings = localStorage.getItem('rqSettings');
        if (settings) {
            const parsed = JSON.parse(settings);
            this.apiEndpoint = parsed.apiEndpoint || null;
            this.apiKey = parsed.apiKey || null;
            this.storeId = parsed.storeId || null;
            this.employeeId = parsed.employeeId || null;
            this.companyId = parsed.companyId || null;
        }
    }

    saveSettings(settings) {
        localStorage.setItem('rqSettings', JSON.stringify(settings));
        this.loadSettings();
    }

    isConfigured() {
        return this.apiEndpoint && this.apiKey && this.storeId && this.employeeId;
    }

    // Export session to RQ-compatible format
    exportToRQ(session, format = 'json') {
        const rqData = this.formatForRQ(session);

        if (format === 'json') {
            return this.exportAsJSON(rqData);
        } else if (format === 'csv') {
            return this.exportAsCSV(rqData);
        } else if (format === 'xml') {
            return this.exportAsXML(rqData);
        }
    }

    // Format session data for RQ
    formatForRQ(session) {
        const rqOrder = {
            // Order Header
            orderHeader: {
                orderId: `SF-${session.id}`,
                orderDate: new Date(session.startTime).toISOString(),
                orderType: 'Sale',
                storeId: this.storeId || 'STORE_ID',
                employeeId: this.employeeId || 'EMP_ID',
                companyId: this.companyId || 'COMPANY_ID',
                status: 'Pending',
                source: 'Verizon Sales Finder App',
                totalAmount: this.calculateTotal(session.saleItems),
                commission: session.commission || 0
            },

            // Customer Information
            customer: this.extractCustomerInfo(session),

            // Line Items
            lineItems: this.formatLineItems(session.saleItems),

            // Opportunities Detected
            salesNotes: this.formatOpportunities(session.opportunities),

            // Session Metadata
            metadata: {
                sessionDuration: this.calculateDuration(session),
                opportunitiesDetected: session.opportunities?.length || 0,
                transcriptLength: session.transcript?.length || 0,
                timestamp: new Date().toISOString()
            }
        };

        return rqOrder;
    }

    extractCustomerInfo(session) {
        // Try to extract customer info from notes
        const notes = session.notes || '';

        // Simple pattern matching for common formats
        const phoneMatch = notes.match(/(\d{3}[-.]?\d{3}[-.]?\d{4})/);
        const emailMatch = notes.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
        const nameMatch = notes.match(/name[:\s]+([A-Z][a-z]+(?:\s[A-Z][a-z]+)*)/i);

        return {
            customerId: null, // Will be assigned by RQ
            firstName: nameMatch ? nameMatch[1].split(' ')[0] : '',
            lastName: nameMatch && nameMatch[1].split(' ').length > 1 ? nameMatch[1].split(' ').slice(1).join(' ') : '',
            phone: phoneMatch ? phoneMatch[1] : '',
            email: emailMatch ? emailMatch[1] : '',
            notes: notes,
            source: 'Walk-in'
        };
    }

    formatLineItems(saleItems) {
        if (!saleItems || saleItems.length === 0) {
            return [];
        }

        return saleItems.map((item, index) => {
            return {
                lineNumber: index + 1,
                sku: this.mapToSKU(item),
                productId: item.id,
                productName: item.name,
                productType: item.type || 'product',
                quantity: 1,
                unitPrice: this.getItemPrice(item),
                discount: 0,
                tax: 0,
                totalPrice: this.getItemPrice(item),
                commission: item.commission || 0,
                category: this.categorizeItem(item)
            };
        });
    }

    mapToSKU(item) {
        // Map internal IDs to RQ SKUs
        // This would need to be customized based on your RQ SKU structure
        const skuMap = {
            // Plans
            'unlimited-welcome': 'VZW-PLAN-UNLIM-WELCOME',
            'unlimited-plus': 'VZW-PLAN-UNLIM-PLUS',
            'unlimited-ultimate': 'VZW-PLAN-UNLIM-ULTIMATE',
            'prepaid-basic': 'VZW-PLAN-PREPAID-5GB',
            'prepaid-unlimited': 'VZW-PLAN-PREPAID-UNLIM',

            // Devices
            'iphone-15-pro-max': 'APPLE-IPH15PM-256-TITANIUM',
            'iphone-15': 'APPLE-IPH15-128-BLACK',
            'iphone-14': 'APPLE-IPH14-128-BLACK',
            'galaxy-s24-ultra': 'SAMSUNG-S24U-256-BLACK',
            'galaxy-s24': 'SAMSUNG-S24-128-BLACK',
            'galaxy-a54': 'SAMSUNG-A54-128-BLACK',
            'pixel-8-pro': 'GOOGLE-PIX8P-128-BLACK',

            // Home Internet
            'fios-300': 'VZW-FIOS-300MBPS',
            'fios-500': 'VZW-FIOS-500MBPS',
            'fios-gig': 'VZW-FIOS-1GIG',
            '5g-home': 'VZW-5GHOME-UNLIM',

            // Accessories
            'otterbox-defender': 'OTTERBOX-DEFENDER-UNIVERSAL',
            'tempered-glass': 'SCRN-PROT-GLASS-UNIVERSAL',
            'wireless-charger': 'CHARGER-WIRELESS-15W',
            'car-charger': 'CHARGER-CAR-USBC',
            'airpods-pro': 'APPLE-AIRPODS-PRO-2',
            'samsung-buds': 'SAMSUNG-BUDS2-PRO'
        };

        return skuMap[item.id] || `UNKNOWN-${item.id.toUpperCase()}`;
    }

    getItemPrice(item) {
        if (item.type === 'plan') {
            return item.pricePerLine ? item.pricePerLine[1] : item.price;
        } else if (item.type === 'device') {
            return item.price || 0;
        } else {
            return item.price || 0;
        }
    }

    categorizeItem(item) {
        const categoryMap = {
            'plan': 'Service Plan',
            'device': 'Device',
            'accessory': 'Accessory',
            'home': 'Home Internet'
        };
        return categoryMap[item.type] || 'Other';
    }

    formatOpportunities(opportunities) {
        if (!opportunities || opportunities.length === 0) {
            return 'No opportunities detected';
        }

        let notes = 'SALES OPPORTUNITIES DETECTED:\n\n';
        opportunities.forEach((opp, index) => {
            notes += `${index + 1}. [${opp.priority.toUpperCase()}] ${opp.type}\n`;
            notes += `   Customer Quote: "${opp.text}"\n`;
            notes += `   Action Taken: ${opp.suggestion}\n\n`;
        });

        return notes;
    }

    calculateTotal(saleItems) {
        if (!saleItems || saleItems.length === 0) {
            return 0;
        }

        return saleItems.reduce((total, item) => {
            return total + this.getItemPrice(item);
        }, 0);
    }

    calculateDuration(session) {
        if (!session.startTime || !session.endTime) {
            return 0;
        }
        const start = new Date(session.startTime);
        const end = new Date(session.endTime);
        return Math.floor((end - start) / 1000 / 60); // minutes
    }

    // Export as JSON
    exportAsJSON(rqData) {
        const jsonStr = JSON.stringify(rqData, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `RQ-Order-${rqData.orderHeader.orderId}-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        return true;
    }

    // Export as CSV
    exportAsCSV(rqData) {
        let csv = 'RQ ORDER EXPORT\n\n';

        // Header
        csv += 'ORDER INFORMATION\n';
        csv += `Order ID,${rqData.orderHeader.orderId}\n`;
        csv += `Order Date,${rqData.orderHeader.orderDate}\n`;
        csv += `Store ID,${rqData.orderHeader.storeId}\n`;
        csv += `Employee ID,${rqData.orderHeader.employeeId}\n`;
        csv += `Total Amount,$${rqData.orderHeader.totalAmount}\n`;
        csv += `Commission,$${rqData.orderHeader.commission}\n\n`;

        // Customer
        csv += 'CUSTOMER INFORMATION\n';
        csv += `Name,${rqData.customer.firstName} ${rqData.customer.lastName}\n`;
        csv += `Phone,${rqData.customer.phone}\n`;
        csv += `Email,${rqData.customer.email}\n\n`;

        // Line Items
        csv += 'LINE ITEMS\n';
        csv += 'Line,SKU,Product Name,Type,Quantity,Unit Price,Commission\n';
        rqData.lineItems.forEach(item => {
            csv += `${item.lineNumber},${item.sku},${item.productName},${item.category},${item.quantity},$${item.unitPrice},$${item.commission}\n`;
        });

        csv += '\n';
        csv += `TOTAL,$${rqData.orderHeader.totalAmount}\n`;
        csv += `TOTAL COMMISSION,$${rqData.orderHeader.commission}\n\n`;

        // Notes
        csv += 'SALES NOTES\n';
        csv += `"${rqData.salesNotes}"\n`;

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `RQ-Order-${rqData.orderHeader.orderId}-${Date.now()}.csv`;
        a.click();
        URL.revokeObjectURL(url);
        return true;
    }

    // Export as XML
    exportAsXML(rqData) {
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<RQOrder>\n';

        // Order Header
        xml += '  <OrderHeader>\n';
        xml += `    <OrderId>${rqData.orderHeader.orderId}</OrderId>\n`;
        xml += `    <OrderDate>${rqData.orderHeader.orderDate}</OrderDate>\n`;
        xml += `    <OrderType>${rqData.orderHeader.orderType}</OrderType>\n`;
        xml += `    <StoreId>${rqData.orderHeader.storeId}</StoreId>\n`;
        xml += `    <EmployeeId>${rqData.orderHeader.employeeId}</EmployeeId>\n`;
        xml += `    <CompanyId>${rqData.orderHeader.companyId}</CompanyId>\n`;
        xml += `    <Status>${rqData.orderHeader.status}</Status>\n`;
        xml += `    <TotalAmount>${rqData.orderHeader.totalAmount}</TotalAmount>\n`;
        xml += `    <Commission>${rqData.orderHeader.commission}</Commission>\n`;
        xml += '  </OrderHeader>\n';

        // Customer
        xml += '  <Customer>\n';
        xml += `    <FirstName>${this.escapeXml(rqData.customer.firstName)}</FirstName>\n`;
        xml += `    <LastName>${this.escapeXml(rqData.customer.lastName)}</LastName>\n`;
        xml += `    <Phone>${rqData.customer.phone}</Phone>\n`;
        xml += `    <Email>${rqData.customer.email}</Email>\n`;
        xml += `    <Source>${rqData.customer.source}</Source>\n`;
        xml += '  </Customer>\n';

        // Line Items
        xml += '  <LineItems>\n';
        rqData.lineItems.forEach(item => {
            xml += '    <LineItem>\n';
            xml += `      <LineNumber>${item.lineNumber}</LineNumber>\n`;
            xml += `      <SKU>${item.sku}</SKU>\n`;
            xml += `      <ProductName>${this.escapeXml(item.productName)}</ProductName>\n`;
            xml += `      <Category>${item.category}</Category>\n`;
            xml += `      <Quantity>${item.quantity}</Quantity>\n`;
            xml += `      <UnitPrice>${item.unitPrice}</UnitPrice>\n`;
            xml += `      <Commission>${item.commission}</Commission>\n`;
            xml += '    </LineItem>\n';
        });
        xml += '  </LineItems>\n';

        // Sales Notes
        xml += '  <SalesNotes>\n';
        xml += `    <![CDATA[${rqData.salesNotes}]]>\n`;
        xml += '  </SalesNotes>\n';

        xml += '</RQOrder>\n';

        const blob = new Blob([xml], { type: 'application/xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `RQ-Order-${rqData.orderHeader.orderId}-${Date.now()}.xml`;
        a.click();
        URL.revokeObjectURL(url);
        return true;
    }

    escapeXml(text) {
        if (!text) return '';
        return text.toString()
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    }

    // Send to RQ API (requires configuration)
    async sendToRQAPI(session) {
        if (!this.isConfigured()) {
            throw new Error('RQ Integration not configured. Please set up API credentials in Settings.');
        }

        const rqData = this.formatForRQ(session);

        try {
            const response = await fetch(`${this.apiEndpoint}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`,
                    'X-Company-Id': this.companyId,
                    'X-Store-Id': this.storeId
                },
                body: JSON.stringify(rqData)
            });

            if (!response.ok) {
                throw new Error(`RQ API Error: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();
            return {
                success: true,
                orderId: result.orderId || result.id,
                message: 'Order successfully sent to RQ',
                data: result
            };
        } catch (error) {
            console.error('RQ API Error:', error);
            return {
                success: false,
                error: error.message,
                message: 'Failed to send order to RQ. Please export manually.'
            };
        }
    }

    // Create RQ Quote (instead of order)
    createQuote(session) {
        const rqData = this.formatForRQ(session);
        rqData.orderHeader.orderType = 'Quote';
        rqData.orderHeader.status = 'Draft';
        return rqData;
    }

    // Generate RQ Invoice Number format
    generateInvoiceNumber() {
        const date = new Date();
        const year = date.getFullYear().toString().substr(-2);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        return `INV-${year}${month}${day}-${random}`;
    }

    // Validate RQ data before export
    validateForRQ(session) {
        const errors = [];
        const warnings = [];

        if (!session.saleItems || session.saleItems.length === 0) {
            errors.push('No items in sale. Add products before exporting to RQ.');
        }

        if (!session.notes || session.notes.trim() === '') {
            warnings.push('No customer notes. Consider adding customer name and contact info.');
        }

        // Check for customer info
        const notes = session.notes || '';
        if (!notes.match(/\d{3}[-.]?\d{3}[-.]?\d{4}/)) {
            warnings.push('No phone number detected in notes. Add customer phone for better tracking.');
        }

        if (session.commission === 0) {
            warnings.push('No commission calculated. Did you add items with commission data?');
        }

        return {
            valid: errors.length === 0,
            errors: errors,
            warnings: warnings
        };
    }
}

// Export for use in main app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RQIntegration;
}

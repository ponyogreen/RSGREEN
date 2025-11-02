// Verizon Product Catalog and Commission Data
// Updated pricing and plans (2024-2025)

const VerizonCatalog = {
    // Unlimited Plans
    plans: {
        unlimited: [
            {
                id: 'unlimited-welcome',
                name: 'Unlimited Welcome',
                price: 65,
                pricePerLine: {
                    1: 65,
                    2: 55,
                    3: 40,
                    4: 35,
                    5: 30
                },
                features: [
                    'Unlimited talk, text & data',
                    '5G Nationwide access',
                    'Unlimited mobile hotspot (4G LTE)',
                    'Talk, text & data in Mexico & Canada'
                ],
                commission: 15,
                bestFor: ['budget', 'basic', 'price-conscious']
            },
            {
                id: 'unlimited-plus',
                name: 'Unlimited Plus',
                price: 80,
                pricePerLine: {
                    1: 80,
                    2: 70,
                    3: 55,
                    4: 50,
                    5: 45
                },
                features: [
                    'Unlimited Premium Data',
                    '5G Ultra Wideband access',
                    '30GB premium mobile hotspot',
                    'Disney Bundle (Disney+, Hulu, ESPN+)',
                    '600GB Verizon Cloud storage',
                    'Apple Music (6 months)',
                    'Talk, text & data in Mexico & Canada',
                    'TravelPass: 1 day/month'
                ],
                commission: 25,
                bestFor: ['streaming', 'entertainment', 'premium', 'family', 'heavy-data']
            },
            {
                id: 'unlimited-ultimate',
                name: 'Unlimited Ultimate',
                price: 90,
                pricePerLine: {
                    1: 90,
                    2: 80,
                    3: 65,
                    4: 60,
                    5: 55
                },
                features: [
                    'Unlimited Premium Data',
                    '5G Ultra Wideband access',
                    '60GB premium mobile hotspot',
                    'Disney Bundle (Disney+, Hulu, ESPN+)',
                    '1TB Verizon Cloud storage',
                    'Apple Music, Apple Arcade, Google Play Pass',
                    'Apple One (3 months)',
                    'Talk, text & data in 210+ countries',
                    'TravelPass: 2 days/month',
                    '3 device discount ($10/mo each)'
                ],
                commission: 35,
                bestFor: ['premium', 'power-user', 'international', 'business', 'gaming', '5g']
            }
        ],
        // Prepaid Plans
        prepaid: [
            {
                id: 'prepaid-basic',
                name: '5GB Prepaid',
                price: 35,
                features: ['5GB data', 'Unlimited talk & text'],
                commission: 10,
                bestFor: ['budget', 'light-user', 'basic']
            },
            {
                id: 'prepaid-unlimited',
                name: 'Unlimited Prepaid',
                price: 50,
                features: ['Unlimited data', '5G access', 'Mobile hotspot'],
                commission: 12,
                bestFor: ['no-contract', 'prepaid']
            }
        ]
    },

    // Home Internet
    homeInternet: [
        {
            id: 'fios-300',
            name: 'Fios 300 Mbps',
            price: 49.99,
            features: ['300 Mbps download/upload', 'No data caps', 'Free router included'],
            commission: 50,
            bestFor: ['home-internet', 'streaming', 'bundle']
        },
        {
            id: 'fios-500',
            name: 'Fios 500 Mbps',
            price: 64.99,
            features: ['500 Mbps download/upload', 'No data caps', 'Free router included'],
            commission: 60,
            bestFor: ['home-internet', 'gaming', 'family', 'bundle']
        },
        {
            id: 'fios-gig',
            name: 'Fios Gigabit',
            price: 89.99,
            features: ['1 Gig download/upload', 'No data caps', 'Free router included', 'Best for streaming & gaming'],
            commission: 75,
            bestFor: ['home-internet', 'gaming', 'premium', 'business']
        },
        {
            id: '5g-home',
            name: '5G Home Internet',
            price: 50,
            discountPrice: 25, // with unlimited mobile
            features: ['Fast wireless internet', 'No data caps', 'Easy setup', 'Bundle discount available'],
            commission: 40,
            bestFor: ['home-internet', 'wireless', 'easy-setup', 'bundle']
        }
    ],

    // Devices (Popular models)
    devices: {
        iphone: [
            {
                id: 'iphone-15-pro-max',
                name: 'iPhone 15 Pro Max',
                price: 1199,
                monthlyPayment: 33.33,
                storage: ['256GB', '512GB', '1TB'],
                features: ['A17 Pro chip', 'Titanium design', 'Action button', 'ProMotion 120Hz'],
                commission: 100,
                tradeInValue: 800,
                bestFor: ['device-upgrade', 'premium', 'camera', 'gaming']
            },
            {
                id: 'iphone-15',
                name: 'iPhone 15',
                price: 799,
                monthlyPayment: 22.22,
                storage: ['128GB', '256GB', '512GB'],
                features: ['A16 Bionic', 'Dynamic Island', 'USB-C', '48MP camera'],
                commission: 80,
                tradeInValue: 600,
                bestFor: ['device-upgrade', 'mainstream', 'family']
            },
            {
                id: 'iphone-14',
                name: 'iPhone 14',
                price: 699,
                monthlyPayment: 19.44,
                storage: ['128GB', '256GB'],
                features: ['A15 Bionic', 'Dual cameras', 'All-day battery'],
                commission: 70,
                tradeInValue: 500,
                bestFor: ['device-upgrade', 'budget', 'family']
            }
        ],
        samsung: [
            {
                id: 'galaxy-s24-ultra',
                name: 'Galaxy S24 Ultra',
                price: 1299,
                monthlyPayment: 36.08,
                storage: ['256GB', '512GB', '1TB'],
                features: ['Galaxy AI', 'S Pen included', '200MP camera', '5000mAh battery'],
                commission: 100,
                tradeInValue: 750,
                bestFor: ['device-upgrade', 'premium', 'android', 'business']
            },
            {
                id: 'galaxy-s24',
                name: 'Galaxy S24',
                price: 799,
                monthlyPayment: 22.22,
                storage: ['128GB', '256GB'],
                features: ['Galaxy AI', 'Bright display', 'Long battery life'],
                commission: 80,
                tradeInValue: 550,
                bestFor: ['device-upgrade', 'mainstream', 'android']
            },
            {
                id: 'galaxy-a54',
                name: 'Galaxy A54',
                price: 449,
                monthlyPayment: 12.47,
                storage: ['128GB'],
                features: ['Great cameras', 'Long battery', 'Expandable storage'],
                commission: 50,
                tradeInValue: 250,
                bestFor: ['device-upgrade', 'budget', 'android']
            }
        ],
        other: [
            {
                id: 'pixel-8-pro',
                name: 'Google Pixel 8 Pro',
                price: 999,
                monthlyPayment: 27.75,
                storage: ['128GB', '256GB', '512GB'],
                features: ['Google AI', 'Best Android camera', 'Magic Editor', '7 years updates'],
                commission: 85,
                tradeInValue: 650,
                bestFor: ['device-upgrade', 'camera', 'android', 'tech-savvy']
            }
        ]
    },

    // Accessories
    accessories: [
        {
            id: 'otterbox-defender',
            name: 'OtterBox Defender Case',
            price: 64.99,
            commission: 15,
            category: 'protection'
        },
        {
            id: 'tempered-glass',
            name: 'Tempered Glass Screen Protector',
            price: 39.99,
            commission: 10,
            category: 'protection'
        },
        {
            id: 'wireless-charger',
            name: 'Wireless Charging Pad',
            price: 49.99,
            commission: 12,
            category: 'charging'
        },
        {
            id: 'car-charger',
            name: 'USB-C Car Charger',
            price: 29.99,
            commission: 8,
            category: 'charging'
        },
        {
            id: 'airpods-pro',
            name: 'Apple AirPods Pro (2nd gen)',
            price: 249,
            monthlyPayment: 10.38,
            commission: 25,
            category: 'audio'
        },
        {
            id: 'samsung-buds',
            name: 'Samsung Galaxy Buds2 Pro',
            price: 229,
            commission: 22,
            category: 'audio'
        }
    ],

    // Add-ons and Protection
    addons: [
        {
            id: 'device-protection',
            name: 'Total Mobile Protection',
            price: 17,
            features: ['Device protection', 'Extended warranty', 'Tech support'],
            commission: 10,
            recurring: true
        },
        {
            id: 'insurance-basic',
            name: 'Mobile Device Protection',
            price: 12.99,
            features: ['Lost/stolen coverage', 'Damage protection'],
            commission: 8,
            recurring: true
        },
        {
            id: 'applecare',
            name: 'AppleCare+',
            price: 12.99,
            features: ['Apple extended warranty', 'Accidental damage coverage'],
            commission: 7,
            recurring: true
        }
    ],

    // Recommendation Engine
    getRecommendations: function(opportunity, currentCustomerInfo = {}) {
        const recommendations = {
            plans: [],
            devices: [],
            accessories: [],
            addons: [],
            totalCommission: 0,
            reasoning: []
        };

        const oppType = opportunity.type.toLowerCase();
        const oppText = opportunity.text.toLowerCase();

        // Plan recommendations based on opportunity
        if (oppType.includes('carrier switch') || oppType.includes('price')) {
            // Competitor or price concern - show value
            if (oppText.includes('expensive') || oppText.includes('save')) {
                recommendations.plans.push(this.plans.unlimited[0]); // Unlimited Welcome
                recommendations.reasoning.push('Start with our most affordable unlimited plan');
            } else {
                recommendations.plans.push(this.plans.unlimited[1]); // Unlimited Plus
                recommendations.reasoning.push('Great value with entertainment included');
            }
        }

        if (oppType.includes('family')) {
            recommendations.plans.push(this.plans.unlimited[1]); // Unlimited Plus
            recommendations.plans.push(this.plans.unlimited[2]); // Unlimited Ultimate
            recommendations.reasoning.push('Family plans start at $30/line with 4+ lines');
        }

        if (oppType.includes('5g') || oppType.includes('streaming') || oppType.includes('gaming')) {
            recommendations.plans.push(this.plans.unlimited[2]); // Unlimited Ultimate
            recommendations.reasoning.push('Our fastest plan with 5G Ultra Wideband');
        }

        if (oppType.includes('business')) {
            recommendations.plans.push(this.plans.unlimited[2]); // Unlimited Ultimate
            recommendations.reasoning.push('Business customers get priority data and international features');
        }

        if (oppType.includes('international')) {
            recommendations.plans.push(this.plans.unlimited[2]); // Unlimited Ultimate
            recommendations.reasoning.push('Includes coverage in 210+ countries with TravelPass days');
        }

        if (oppType.includes('home internet')) {
            recommendations.plans.push(...this.homeInternet.filter(h => h.id.includes('fios') || h.id === '5g-home'));
            recommendations.reasoning.push('Bundle home internet with mobile for $25/mo discount');
        }

        // Device recommendations
        if (oppType.includes('device upgrade') || oppType.includes('old phone')) {
            if (oppText.includes('iphone') || oppText.includes('apple')) {
                recommendations.devices.push(this.devices.iphone[0]); // Latest iPhone Pro
                recommendations.devices.push(this.devices.iphone[1]); // Standard iPhone
            } else if (oppText.includes('samsung') || oppText.includes('galaxy') || oppText.includes('android')) {
                recommendations.devices.push(this.devices.samsung[0]); // S24 Ultra
                recommendations.devices.push(this.devices.samsung[1]); // S24
            } else {
                // Show both options
                recommendations.devices.push(this.devices.iphone[1]);
                recommendations.devices.push(this.devices.samsung[1]);
            }
            recommendations.reasoning.push('Trade-in your old device for up to $800 off');
        }

        // Accessories recommendations
        if (oppType.includes('accessories') || recommendations.devices.length > 0) {
            recommendations.accessories.push(
                this.accessories.find(a => a.id === 'otterbox-defender'),
                this.accessories.find(a => a.id === 'tempered-glass'),
                this.accessories.find(a => a.id === 'wireless-charger')
            );
            recommendations.reasoning.push('Protect your investment with a case and screen protector');
        }

        if (oppText.includes('airpods') || oppText.includes('headphones') || oppText.includes('earbuds')) {
            const airpods = this.accessories.find(a => a.id === 'airpods-pro');
            const buds = this.accessories.find(a => a.id === 'samsung-buds');
            if (oppText.includes('iphone') || oppText.includes('apple')) {
                recommendations.accessories.push(airpods);
            } else if (oppText.includes('samsung') || oppText.includes('android')) {
                recommendations.accessories.push(buds);
            } else {
                recommendations.accessories.push(airpods, buds);
            }
        }

        // Protection add-ons (always recommend with device)
        if (recommendations.devices.length > 0) {
            recommendations.addons.push(this.addons.find(a => a.id === 'device-protection'));
            recommendations.reasoning.push('Add Total Mobile Protection for peace of mind');
        }

        // Calculate total commission
        recommendations.plans.forEach(p => recommendations.totalCommission += p.commission || 0);
        recommendations.devices.forEach(d => recommendations.totalCommission += d.commission || 0);
        recommendations.accessories.forEach(a => recommendations.totalCommission += a.commission || 0);
        recommendations.addons.forEach(a => recommendations.totalCommission += a.commission || 0);

        return recommendations;
    },

    // Calculate monthly cost for a configuration
    calculateMonthlyCost: function(config) {
        let total = 0;
        let breakdown = [];

        // Plan cost (with line count)
        if (config.plan && config.lines) {
            const linePrice = config.plan.pricePerLine ?
                config.plan.pricePerLine[Math.min(config.lines, 5)] :
                config.plan.price;
            const planTotal = linePrice * config.lines;
            total += planTotal;
            breakdown.push({
                item: `${config.plan.name} x ${config.lines} line(s)`,
                price: planTotal
            });
        }

        // Device payment
        if (config.device) {
            total += config.device.monthlyPayment || 0;
            breakdown.push({
                item: config.device.name,
                price: config.device.monthlyPayment || 0
            });
        }

        // Add-ons
        if (config.addons) {
            config.addons.forEach(addon => {
                total += addon.price;
                breakdown.push({
                    item: addon.name,
                    price: addon.price
                });
            });
        }

        return {
            total: total,
            breakdown: breakdown,
            perLine: config.lines ? (total / config.lines) : total
        };
    },

    // Calculate commission for a sale
    calculateCommission: function(items) {
        let total = 0;
        let breakdown = [];

        items.forEach(item => {
            if (item.commission) {
                total += item.commission;
                breakdown.push({
                    item: item.name,
                    commission: item.commission
                });
            }
        });

        return {
            total: total,
            breakdown: breakdown
        };
    }
};

// Export for use in main app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VerizonCatalog;
}

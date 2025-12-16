"""Seed script to populate database with initial course content."""
import os
import sys
import django

# Setup Django
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'bfpa_backend.settings')
django.setup()

from courses.models import Course, Module, ContentSection, ContentPoint, ContentExample, ReflectionQuestion


def create_course_data():
    """Create all courses and modules."""
    
    # Clear existing data
    Course.objects.all().delete()
    
    # Course 1: Corporate Finance & Treasury
    corporate_finance = Course.objects.create(
        slug='corporate-finance',
        title='Corporate Finance & Treasury',
        description='Learn to manage Bitcoin as a strategic treasury asset and understand its role in modern corporate finance.',
        icon='Briefcase',
        color='gold',
        order=0
    )
    
    # Module 1 for Corporate Finance
    mod1 = Module.objects.create(
        course=corporate_finance,
        slug='mod-1',
        title='Introduction to Bitcoin & Sound Money',
        objective='Understand what Bitcoin is, why it was created, and how it restores principles of sound money.',
        order=0
    )
    
    # Content sections for Module 1
    sections_data = [
        {
            'title': '1. The Evolution of Money: From Barter to Bitcoin',
            'description': "Understanding Bitcoin begins with understanding why money evolves. Every stage of money throughout history solved problems of the previous one.",
            'points': [],
            'examples': []
        },
        {
            'title': 'Barter System',
            'description': 'People exchanged goods directly: maize for milk, labor for cattle.',
            'points': ['Double coincidence of wants', 'Difficult to store value', 'Hard to transport or divide'],
            'examples': []
        },
        {
            'title': 'Gold & Precious Metals',
            'description': 'Gold emerged as a universal medium of exchange.',
            'points': [
                'Advantages: Durable, scarce, universally recognized',
                'Heavy, difficult to transport long distances',
                'Hard to verify authenticity',
                "Banks arose to 'store and issue receipts,' which introduced trust issues"
            ],
            'examples': []
        },
        {
            'title': 'Fiat Money (Government-Issued Currency)',
            'description': 'Governments replaced gold with paper money.',
            'points': [
                'Advantages: Easy to transport, divide, transact',
                'No inherent value',
                'Supply can be increased at any time',
                'Depends on trust in policymakers, not mathematics'
            ],
            'examples': []
        },
        {
            'title': 'Bitcoin (Digital, Decentralized Money)',
            'description': 'In 2009, Bitcoin introduced a new form of money built on cryptographic proof instead of trust.',
            'points': [
                'Scarcity',
                'Borderless payments',
                'Secure digital ownership',
                'Decentralized control (no central bank)'
            ],
            'examples': []
        },
        {
            'title': '2. Why Fiat Money Loses Value',
            'description': "Most African professionals experience inflation daily — from rising food prices to shrinking salaries. Understanding why this happens is essential.",
            'points': [],
            'examples': []
        },
        {
            'title': 'Inflation',
            'description': 'When governments print more money, the value of existing money falls.',
            'points': [],
            'examples': ['If Kenya prints more shillings, you need more shillings to buy the same mandazi.']
        },
        {
            'title': 'Centralized Control',
            'description': 'Fiat currencies depend on:',
            'points': [
                'Interest rate decisions',
                'Government borrowing',
                'Political cycles',
                'Monetary policies that often prioritize short-term issues'
            ],
            'examples': [
                'This makes fiat money vulnerable to: Devaluation, Corruption, Mismanagement',
                'Currency crises examples: Zimbabwe, Argentina, Sudan, Nigeria'
            ]
        },
        {
            'title': 'Loss of Purchasing Power',
            'description': 'Across Africa, people see:',
            'points': [
                'Salaries stagnant → prices rising',
                'Savings losing value yearly',
                'Exchange rate collapse against USD'
            ],
            'examples': ['Bitcoin offers a technological alternative.']
        },
        {
            'title': "3. Bitcoin's Core Properties",
            'description': 'Bitcoin is designed with properties that solve the weaknesses of fiat money.',
            'points': [],
            'examples': []
        },
        {
            'title': 'Scarcity (21 Million)',
            'description': 'Only 21 million bitcoins will ever exist.',
            'points': [
                'Cannot be changed',
                'Creates predictable issuance',
                'Makes Bitcoin deflationary',
                'Makes long-term planning easier for businesses'
            ],
            'examples': []
        },
        {
            'title': 'Decentralization',
            'description': 'No single person, company, or government controls Bitcoin.',
            'points': ['A global network of nodes', 'Transparent rules', 'Open-source code'],
            'examples': ['This reduces: Censorship, Corruption, Single points of failure']
        },
        {
            'title': 'Immutability',
            'description': 'Once data is recorded on the blockchain, it cannot be altered.',
            'points': ['Transaction integrity', 'Transparent audit trails', 'Trustless verification'],
            'examples': []
        },
        {
            'title': 'Portability',
            'description': 'Bitcoin can be:',
            'points': [
                'Sent globally in minutes',
                'Stored on a phone or hardware wallet',
                'Moved across borders',
                'Accessed without permission'
            ],
            'examples': ['This makes Bitcoin perfect for: Remote work payments, Diaspora transactions, Corporate treasury mobility']
        },
        {
            'title': '4. Why Corporations Are Exploring Bitcoin as a Treasury Hedge',
            'description': 'From global giants like MicroStrategy to African fintech startups, corporations are noticing the strategic benefits of Bitcoin.',
            'points': [],
            'examples': []
        },
        {
            'title': 'Hedge Against Inflation',
            'description': 'Corporations hold large cash reserves. Cash loses value due to: Inflation, Currency devaluation, Low interest rates.',
            'points': ['Predictable supply', 'Protection against monetary expansion', 'Long-term store of value'],
            'examples': []
        },
        {
            'title': 'Strong Liquidity',
            'description': 'Bitcoin trades globally, 24/7:',
            'points': ['Deep liquidity', 'Easy to convert', 'Transparent market price'],
            'examples': []
        },
        {
            'title': 'Competitive Advantage',
            'description': 'Companies that adopt Bitcoin early benefit from:',
            'points': ['Global reputation as innovators', 'Attraction of top talent', 'Stronger treasury resilience'],
            'examples': []
        },
        {
            'title': 'Modern Workforce Expectations',
            'description': 'Younger professionals increasingly prefer:',
            'points': ['Bitcoin bonuses', 'BTC salary options', 'Cross-border payment freedom'],
            'examples': ['Corporations are adapting to stay competitive.']
        },
        {
            'title': '5. Global Trend: Salaries Paid in Bitcoin',
            'description': 'Around the world — including Africa — companies are introducing Bitcoin payroll for local and remote staff.',
            'points': [],
            'examples': []
        },
        {
            'title': 'Why Employees Want Bitcoin',
            'description': '',
            'points': [
                'Protects against local currency inflation',
                'Fast international payments',
                'No bank delays or high fees',
                'Salary mobility across borders'
            ],
            'examples': []
        },
        {
            'title': 'Why Employers Offer Bitcoin',
            'description': '',
            'points': [
                'Easy payment for remote global teams',
                'Reduced cross-border friction',
                'Attractive compensation packages',
                'Compliance-friendly tools exist (e.g., Bitwage, Strike, Bitnob Business)'
            ],
            'examples': []
        },
        {
            'title': 'Examples in Africa',
            'description': 'Remote workers in Kenya, Nigeria, Ghana, South Africa increasingly request:',
            'points': ['Partial BTC salaries', 'BTC savings plans', 'Bitcoin-based bonuses'],
            'examples': ['Bitcoin payroll is becoming a global HR strategy, not a niche idea.']
        }
    ]
    
    for idx, section_data in enumerate(sections_data):
        section = ContentSection.objects.create(
            module=mod1,
            title=section_data['title'],
            description=section_data.get('description', ''),
            order=idx
        )
        for p_idx, point in enumerate(section_data.get('points', [])):
            ContentPoint.objects.create(section=section, text=point, order=p_idx)
        for e_idx, example in enumerate(section_data.get('examples', [])):
            ContentExample.objects.create(section=section, text=example, order=e_idx)
    
    # Reflection questions for Module 1
    ReflectionQuestion.objects.create(
        module=mod1,
        question="How does Bitcoin's fixed supply impact corporate financial planning?",
        order=0
    )
    ReflectionQuestion.objects.create(
        module=mod1,
        question="Describe one real-world challenge Bitcoin solves for global businesses.",
        order=1
    )
    
    # Module 2
    mod2 = Module.objects.create(
        course=corporate_finance,
        slug='mod-2',
        title='Accounting and Taxation in Bitcoin',
        objective='Learn how to record Bitcoin on balance sheets and report gains or losses responsibly.',
        order=1
    )
    
    mod2_sections = [
        'Bitcoin as an intangible asset (IFRS/GAAP classification)',
        'Valuation and impairment accounting (cost vs. fair value model)',
        'How to track transactions in accounting systems',
        'Taxation basics: capital gains, income recognition, donation reporting',
        'Emerging global standards for crypto accounting'
    ]
    
    for idx, title in enumerate(mod2_sections):
        ContentSection.objects.create(module=mod2, title=title, order=idx)
    
    ReflectionQuestion.objects.create(
        module=mod2,
        question="What are the key risks of misclassifying Bitcoin on a company's balance sheet?",
        order=0
    )
    ReflectionQuestion.objects.create(
        module=mod2,
        question="How would you explain capital gains on BTC to a finance team member?",
        order=1
    )
    
    # Module 3
    mod3 = Module.objects.create(
        course=corporate_finance,
        slug='mod-3',
        title='Corporate Treasury Strategies (Case Studies)',
        objective='Understand how companies like MicroStrategy, Tesla, and African startups manage Bitcoin in their treasury portfolios.',
        order=2
    )
    
    mod3_sections = [
        'Why corporations add BTC to their balance sheets',
        'Case study 1: MicroStrategy — long-term accumulation & leverage strategy',
        'Case study 2: Tesla — liquidity management & sell strategy',
        'African context: how fintechs integrate BTC with M-Pesa APIs',
        'Tools: BTCPay Server, Wallet of Satoshi, Bitnob for business',
        'Key lessons: risk appetite, governance, regulatory awareness'
    ]
    
    for idx, title in enumerate(mod3_sections):
        ContentSection.objects.create(module=mod3, title=title, order=idx)
    
    ReflectionQuestion.objects.create(
        module=mod3,
        question="Compare Tesla's and MicroStrategy's treasury strategies — what can African firms learn?",
        order=0
    )
    ReflectionQuestion.objects.create(
        module=mod3,
        question="What infrastructure tools would you use to manage a small Bitcoin treasury?",
        order=1
    )
    
    # Module 4
    mod4 = Module.objects.create(
        course=corporate_finance,
        slug='mod-4',
        title='Risk Management & Volatility Hedging',
        objective='Learn how to manage risks around volatility, custody, and compliance.',
        order=3
    )
    
    mod4_sections = [
        'Types of risks: market, custodial, operational, legal',
        'Mitigation: dollar-cost averaging, BTC/fiat balance, stablecoin buffers',
        'Insurance and audit considerations',
        'Using derivatives or hedging products responsibly',
        'Educating boards on long-term horizon vs. short-term price moves'
    ]
    
    for idx, title in enumerate(mod4_sections):
        ContentSection.objects.create(module=mod4, title=title, order=idx)
    
    ReflectionQuestion.objects.create(
        module=mod4,
        question="How can volatility become an opportunity rather than a threat?",
        order=0
    )
    ReflectionQuestion.objects.create(
        module=mod4,
        question="What mix of BTC vs. fiat would you recommend for a balanced treasury?",
        order=1
    )
    
    # Module 5
    mod5 = Module.objects.create(
        course=corporate_finance,
        slug='mod-5',
        title='Compliance, Custody, and Governance',
        objective='Ensure that Bitcoin use in business follows best-practice controls and regulatory alignment.',
        order=4
    )
    
    mod5_sections = [
        'Custody models: self-custody, multi-sig, third-party',
        'Setting internal roles and permissions (CEO, CFO, IT, Audit)',
        'Reporting & compliance frameworks: AML/KYC',
        'Maintaining transparency while preserving security',
        'Case: how NGOs publish Proof of Funds while protecting keys'
    ]
    
    for idx, title in enumerate(mod5_sections):
        ContentSection.objects.create(module=mod5, title=title, order=idx)
    
    ReflectionQuestion.objects.create(
        module=mod5,
        question="What are the advantages of multi-signature custody for a company?",
        order=0
    )
    ReflectionQuestion.objects.create(
        module=mod5,
        question="How can you balance transparency with security in Bitcoin reporting?",
        order=1
    )
    
    # Module 6 (with capstone)
    mod6 = Module.objects.create(
        course=corporate_finance,
        slug='mod-6',
        title='Building a Bitcoin Reserve Policy',
        objective="Develop a documented corporate Bitcoin policy that fits your organization's mission and risk tolerance.",
        order=5,
        capstone_task="Draft a 1-page Bitcoin Treasury Proposal for your company or a sample business. Include: purpose, custody plan, risk notes, and communication plan."
    )
    
    mod6_sections = [
        'Drafting policy objectives: why hold Bitcoin',
        'Setting allocation percentage and rebalancing rules',
        'Defining storage, security, and reporting procedures',
        'Integration with payroll or savings products',
        'Example: Tando partnership — connecting BTC with M-Pesa APIs'
    ]
    
    for idx, title in enumerate(mod6_sections):
        ContentSection.objects.create(module=mod6, title=title, order=idx)
    
    ReflectionQuestion.objects.create(
        module=mod6,
        question="What steps would you take to present a Bitcoin treasury plan to executives?",
        order=0
    )
    ReflectionQuestion.objects.create(
        module=mod6,
        question="How could local fintech partnerships help integrate Bitcoin seamlessly?",
        order=1
    )
    
    # Course 2: NGOs & Activists
    ngo_course = Course.objects.create(
        slug='ngos-activists',
        title='NGOs & Activists',
        description='Empower your organization with transparent, borderless funding and financial sovereignty through Bitcoin.',
        icon='Globe',
        color='emerald',
        order=1
    )
    
    # NGO Modules
    ngo_mod1 = Module.objects.create(
        course=ngo_course,
        slug='mod-1',
        title='Bitcoin for Humanitarian Aid',
        objective='Explore how Bitcoin enables censorship-resistant, borderless humanitarian funding.',
        order=0
    )
    
    ngo_mod1_sections = [
        'Traditional aid challenges: banking blocks, frozen funds, fees',
        'Bitcoin as neutral money for cross-border relief',
        'Real examples: donation drives via Lightning, wallet management for NGOs',
        'How to onboard communities and beneficiaries safely'
    ]
    
    for idx, title in enumerate(ngo_mod1_sections):
        ContentSection.objects.create(module=ngo_mod1, title=title, order=idx)
    
    ReflectionQuestion.objects.create(
        module=ngo_mod1,
        question="In what situation could Bitcoin improve your NGO's efficiency?",
        order=0
    )
    ReflectionQuestion.objects.create(
        module=ngo_mod1,
        question="What security concerns should NGOs consider when receiving BTC donations?",
        order=1
    )
    
    # NGO Module 2
    ngo_mod2 = Module.objects.create(
        course=ngo_course,
        slug='mod-2',
        title='Proof of Funds & Transparency Tools',
        objective="Use Bitcoin's open ledger for transparent and verifiable funding.",
        order=1
    )
    
    ngo_mod2_sections = [
        'Public addresses and transaction explorers',
        'Creating "Proof of Funds" pages',
        'Tools: Tallycoin, OpenNode, Geyser, Bitnob Causes',
        'Ethical handling of donor visibility vs. beneficiary privacy'
    ]
    
    for idx, title in enumerate(ngo_mod2_sections):
        ContentSection.objects.create(module=ngo_mod2, title=title, order=idx)
    
    ReflectionQuestion.objects.create(
        module=ngo_mod2,
        question="Why is public proof important for donor trust?",
        order=0
    )
    ReflectionQuestion.objects.create(
        module=ngo_mod2,
        question="Explore one transparency tool and describe how you'd use it.",
        order=1
    )
    
    # NGO Module 3
    ngo_mod3 = Module.objects.create(
        course=ngo_course,
        slug='mod-3',
        title='Lightning Network for Microdonations',
        objective='Understand how the Lightning Network supports instant, low-cost global giving.',
        order=2
    )
    
    ngo_mod3_sections = [
        'What the Lightning Network is and how it works',
        'Setting up a Lightning wallet',
        'Collecting micro-donations for campaigns',
        'Integrating QR codes and M-Pesa bridges',
        'Real example: community educators funding through sats donations'
    ]
    
    for idx, title in enumerate(ngo_mod3_sections):
        ContentSection.objects.create(module=ngo_mod3, title=title, order=idx)
    
    ReflectionQuestion.objects.create(
        module=ngo_mod3,
        question="Why is the Lightning Network especially relevant for African NGOs?",
        order=0
    )
    ReflectionQuestion.objects.create(
        module=ngo_mod3,
        question="What use case would you design using Lightning donations?",
        order=1
    )
    
    # NGO Module 4
    ngo_mod4 = Module.objects.create(
        course=ngo_course,
        slug='mod-4',
        title='Security, Privacy & Self-Custody',
        objective='Protect NGO or activist funds from theft, misuse, or seizure.',
        order=3
    )
    
    ngo_mod4_sections = [
        'Threat models for NGOs (phishing, confiscation, lost keys)',
        'Cold storage, hardware wallets, multi-sig setups',
        'Privacy practices (address reuse, communication tools like Signal)',
        'Operational guidelines for multi-person teams'
    ]
    
    for idx, title in enumerate(ngo_mod4_sections):
        ContentSection.objects.create(module=ngo_mod4, title=title, order=idx)
    
    ReflectionQuestion.objects.create(
        module=ngo_mod4,
        question="How could you design a secure wallet system for your organization?",
        order=0
    )
    ReflectionQuestion.objects.create(
        module=ngo_mod4,
        question="What mistakes should NGOs avoid when managing Bitcoin?",
        order=1
    )
    
    # NGO Module 5 (with capstone)
    ngo_mod5 = Module.objects.create(
        course=ngo_course,
        slug='mod-5',
        title='Case Studies — Feminist Coalition Nigeria & Ukraine DAO',
        objective='Learn from real organizations that used Bitcoin for activism and relief.',
        order=4,
        capstone_task="Design a Bitcoin Aid Project plan for your NGO or a cause you support. Include: goal, funding method, transparency tool, security plan."
    )
    
    ngo_mod5_sections = [
        'Feminist Coalition: raising funds during #EndSARS using Bitcoin',
        'Ukraine DAO: international donations for wartime relief',
        'What worked: transparency, speed, decentralization',
        'Lessons learned: communication, safety, education of donors'
    ]
    
    for idx, title in enumerate(ngo_mod5_sections):
        ContentSection.objects.create(module=ngo_mod5, title=title, order=idx)
    
    ReflectionQuestion.objects.create(
        module=ngo_mod5,
        question="What principles can African NGOs borrow from these case studies?",
        order=0
    )
    ReflectionQuestion.objects.create(
        module=ngo_mod5,
        question="How would you educate your donors to use Bitcoin confidently?",
        order=1
    )
    
    # Course 3: Educators & Institutions
    edu_course = Course.objects.create(
        slug='educators',
        title='Educators & Institutions',
        description='Integrate Bitcoin education into your curriculum and prepare students for the decentralized future.',
        icon='GraduationCap',
        color='secondary',
        order=2
    )
    
    # Educator Module 1
    edu_mod1 = Module.objects.create(
        course=edu_course,
        slug='mod-1',
        title='Bitcoin Pedagogy — Teaching Money for the Digital Age',
        objective='Learn how to teach Bitcoin concepts effectively to students and professionals.',
        order=0
    )
    
    edu_mod1_sections = [
        'Why Bitcoin literacy is critical for future economies',
        'Teaching frameworks: analogies, storytelling, experiments',
        'Explaining complex ideas simply (hashing, scarcity, decentralization)',
        'Inclusive pedagogy for non-technical learners'
    ]
    
    for idx, title in enumerate(edu_mod1_sections):
        ContentSection.objects.create(module=edu_mod1, title=title, order=idx)
    
    ReflectionQuestion.objects.create(
        module=edu_mod1,
        question="What teaching method would you use to explain Bitcoin to beginners?",
        order=0
    )
    ReflectionQuestion.objects.create(
        module=edu_mod1,
        question="Why is it important for universities to include Bitcoin in curricula?",
        order=1
    )
    
    # Educator Module 2
    edu_mod2 = Module.objects.create(
        course=edu_course,
        slug='mod-2',
        title='Curriculum Design & Assessment Tools',
        objective='Develop a structured Bitcoin education program.',
        order=1
    )
    
    edu_mod2_sections = [
        'Setting learning outcomes and skill rubrics',
        'Module sequencing and difficulty scaling',
        'Tools: Google Classroom, Moodle, LearnDash, custom LMS',
        'Designing quizzes, peer discussions, and project assessments'
    ]
    
    for idx, title in enumerate(edu_mod2_sections):
        ContentSection.objects.create(module=edu_mod2, title=title, order=idx)
    
    ReflectionQuestion.objects.create(
        module=edu_mod2,
        question="Draft one measurable learning objective for a Bitcoin course.",
        order=0
    )
    ReflectionQuestion.objects.create(
        module=edu_mod2,
        question="What tool would you use to track student progress effectively?",
        order=1
    )
    
    # Educator Module 3 (with capstone)
    edu_mod3 = Module.objects.create(
        course=edu_course,
        slug='mod-3',
        title='Partnerships with Bitcoin Companies & Ecosystems',
        objective='Collaborate with industry players to bring Bitcoin learning into the real world.',
        order=2,
        capstone_task="Design a partnership concept between your institution and a Bitcoin company. Outline goals, benefits, and activities (hackathon, scholarship, research)."
    )
    
    edu_mod3_sections = [
        'Mapping the Bitcoin ecosystem (exchanges, wallets, payment apps)',
        'How to propose partnerships (case: Tando, Bitnob, Machankura)',
        'Sponsorships, internships, and open-source collaboration',
        'Building sustainable campus Bitcoin hubs'
    ]
    
    for idx, title in enumerate(edu_mod3_sections):
        ContentSection.objects.create(module=edu_mod3, title=title, order=idx)
    
    ReflectionQuestion.objects.create(
        module=edu_mod3,
        question="What type of partnership would most benefit your institution?",
        order=0
    )
    ReflectionQuestion.objects.create(
        module=edu_mod3,
        question="How can students gain hands-on Bitcoin experience?",
        order=1
    )
    
    print("Database seeded successfully!")
    print(f"Created {Course.objects.count()} courses")
    print(f"Created {Module.objects.count()} modules")
    print(f"Created {ContentSection.objects.count()} content sections")
    print(f"Created {ReflectionQuestion.objects.count()} reflection questions")


if __name__ == '__main__':
    create_course_data()

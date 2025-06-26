const projectsData = {
    'ceti-market': {
        titleKey: 'projects.cetiMarket.title',
        descriptionKey: 'projects.cetiMarket.description',
        status: 'completed',
        type: 'school',
        longDescriptionKey: 'projectDetails.cetiMarket.longDescription',
        technologies: ['react', 'nodejs', 'postgresql', 'prisma', 'socketio', 'googleVision', 'paypal', 'css'],
        featuresKeys: [
            'projectDetails.cetiMarket.features.auth',
            'projectDetails.cetiMarket.features.search',
            'projectDetails.cetiMarket.features.cart',
            'projectDetails.cetiMarket.features.paypal',
            'projectDetails.cetiMarket.features.rating',
            'projectDetails.cetiMarket.features.vision',
            'projectDetails.cetiMarket.features.language',
            'projectDetails.cetiMarket.features.notifications',
            'projectDetails.cetiMarket.features.accessibility',
        ],
        githubUrl: null,
        liveUrl: null,
        imagesCount: 6,
    },
    'mazamitla-cabins': {
        titleKey: 'projects.mazamitlaCabins.title',
        descriptionKey: 'projects.mazamitlaCabins.description',
        status: 'completed',
        type: 'freelance',
        longDescriptionKey: 'projectDetails.mazamitlaCabins.longDescription',
        technologies: ['react', 'tailwind', 'supabase', 'prisma'],
        featuresKeys: [
            'projectDetails.mazamitlaCabins.features.calendar',
            'projectDetails.mazamitlaCabins.features.booking',
            'projectDetails.mazamitlaCabins.features.management',
            'projectDetails.mazamitlaCabins.features.search',
            'projectDetails.mazamitlaCabins.features.confirmation',
        ],
        githubUrl: null,
        liveUrl: 'https://cabanas-mazamitla.vercel.app/',
        imagesCount: 5,
    },
};

export default projectsData;
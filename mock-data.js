// Mock data for testimonials
const testimonialsData = [
    {
        id: 1,
        name: "Maria Santos",
        rating: 5,
        text: "ASKAPS Academy has been wonderful for my daughter. The teachers are caring and dedicated, and I've seen remarkable growth in her confidence and reading skills. She actually looks forward to going to school every day!",
        initials: "MS"
    },
    {
        id: 2,
        name: "John dela Cruz",
        rating: 4,
        text: "We're very happy with the education our son is receiving at ASKAPS. The teaching methods are effective, and the school really focuses on character development alongside academics. Great value for the quality of education.",
        initials: "JD"
    },
    {
        id: 3,
        name: "Linda Reyes",
        rating: 5,
        text: "Outstanding school! My two children have thrived here. The teachers genuinely care about each student's progress, and the curriculum is well-balanced. The safe and supportive environment gives me peace of mind.",
        initials: "LR"
    },
    {
        id: 4,
        name: "Roberto Garcia",
        rating: 4,
        text: "ASKAPS Academy provides excellent education at an affordable price. The faculty is experienced and approachable. My son has improved tremendously in both academics and social skills since enrolling here.",
        initials: "RG"
    },
    {
        id: 5,
        name: "Angela Martinez",
        rating: 5,
        text: "Best decision we made for our daughter's education! The kindergarten program is exceptional - she's learning so much while having fun. The teachers are patient, creative, and truly invested in the children's development.",
        initials: "AM"
    }
];

// Mock data for contact form (will be replaced with actual backend)
const mockContactFormSubmit = (formData) => {
    return new Promise((resolve, reject) => {
        // Simulate API call delay
        setTimeout(() => {
            // Simulate 90% success rate
            if (Math.random() > 0.1) {
                resolve({
                    success: true,
                    message: "Thank you for reaching out! We'll get back to you within 24 hours."
                });
            } else {
                reject({
                    success: false,
                    message: "Something went wrong. Please try again or call us directly."
                });
            }
        }, 1500);
    });
};

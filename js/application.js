// Superleap API Submission
const submitToSuperleap = async (data) => {
    const API_ENDPOINT = "https://v1hooks.superleap.com/AbdSvZ/AbdSvZ_NFmEx2rPRY3BspJLTYLj";

    try {
        // We use mode: 'no-cors' to bypass CORS preflight checks.
        // This is necessary because v1hooks.superleap.com may not have the required CORS headers
        // for cross-origin requests from browsers.
        // Note: The response will be 'opaque', meaning we won't be able to read the status or body.
        await fetch(API_ENDPOINT, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        // Since we are in no-cors mode, we assume the request was sent successfully
        return { success: true };
    } catch (error) {
        console.error("Superleap submission error:", error);
        throw error;
    }
};

// Helper to get UTM parameters
const getUTMParams = () => {
    const params = new URLSearchParams(window.location.search);
    return {
        utmSource: params.get('utm_source') || '',
        utmMedium: params.get('utm_medium') || '',
        utmCampaign: params.get('utm_campaign') || '',
        utmTerm: params.get('utm_term') || '',
        utmContent: params.get('utm_content') || '',
        utmURL: window.location.href,
    };
};

// Application Modal State Management
const ApplicationModal = {
    isOpen: false,
    downloadBrochure: false,
    currentStep: 1,
    formData: {
        name: '',
        email: '',
        phone: '',
        work_experience: '',
        programName: '',
        programElective: '',
        highest_qualification: '',
        what_is_your_current_domain_of_work: '',
        linkedin_profile_url: '',
        university: "jain",
        utmSource: '',
        utmMedium: '',
        utmCampaign: '',
        utmTerm: '',
        utmContent: '',
        utmChannel: 'Enquire Now',
        utmURL: ''
    },

    // Program and elective data
    programs: [
        {
            name: "BCOM",
            slug: "bcom",
            electives: [
                { name: "International Finance & Accounting (Accredited by ACCA, UK)", slug: "international-finance-and-accounting-accredited-by-acca-uk" },
                { name: "General", slug: "general" }
            ]
        },
        {
            name: "BCA",
            slug: "bca",
            electives: [
                { name: "Data Science and Analytics", slug: "data-science-and-analytics" },
                { name: "Cloud Computing", slug: "cloud-computing" },
                { name: "Cyber Security", slug: "cyber-security" },
                { name: "Artificial Intelligence", slug: "artificial-intelligence" },
                { name: "Computer Science & Information Technology", slug: "computer-science-and-information-technology" }
            ]
        },
        {
            name: "BBA",
            slug: "bba",
            electives: [
                { name: "Healthcare Management", slug: "healthcare-management" },
                { name: "General Management", slug: "general-management" }
            ]
        },
        {
            name: "MCOM",
            slug: "mcom",
            electives: [
                { name: "International Finance (Accredited by ACCA, UK)", slug: "international-finance-accredited-by-acca-uk" },
                { name: "General", slug: "general" }
            ]
        },
        {
            name: "MBA",
            slug: "mba",
            electives: [
                { name: "Human Resource Management", slug: "human-resource-management" },
                { name: "Finance", slug: "finance" },
                { name: "Marketing", slug: "marketing" },
                { name: "General Management", slug: "general-management" },
                { name: "Finance and Marketing", slug: "finance-and-marketing" },
                { name: "Human Resource Management and Finance", slug: "human-resource-management-and-finance" },
                { name: "Marketing and Human Resource Management", slug: "marketing-and-human-resource-management" },
                { name: "Marketing and Business Analytics", slug: "Marketing and Business Analytics" },
                { name: "Finance and Business Analytics", slug: "Finance and Business Analytics" },
                { name: "Human Resource and Business Analytics", slug: "Human Resource and Business Analytics" },
                { name: "Project Management", slug: "project-management" },
                { name: "Retail Management and Quick Commerce", slug: "Retail Management and Quick Commerce" },
                { name: "Information Technology Management", slug: "information-technology-management" },
                { name: "Healthcare Management", slug: "healthcare-management" },
                { name: "Supply Chain Production and Operations Management", slug: "Supply Chain Production and Operations Management" },
                { name: "Business Intelligence & Analytics", slug: "business-intelligence-and-analytics" },
                { name: "Entrepreneurship and Venture Creation", slug: "Entrepreneurship and Venture Creation" },
                { name: "International Finance (Accredited by ACCA, UK)", slug: "international-finance-accredited-by-acca-uk" }
            ]
        },
        {
            name: "MCA",
            slug: "mca",
            electives: [
                { name: "Computer Science & IT", slug: "computer-science-and-it" },
                { name: "DevOps", slug: "devops" },
                { name: "Cyber Security", slug: "cyber-security" },
                { name: "Data Analytics", slug: "data-analytics" },
                { name: "NLP & LLM Development", slug: "NLP & LLM Development" }
            ]
        },
        {
            name: "MA",
            slug: "ma",
            electives: [
                { name: "Jainology and Comparative Religions & Philosophy", slug: "Jainology and Comparative Religions & Philosophy" },
                { name: "English", slug: "english" },
                { name: "Public Policy", slug: "public-policy" },
                { name: "Economics", slug: "economics" }
            ]
        }
    ],

    init() {
        this.setupEventListeners();
        Object.assign(this.formData, getUTMParams());
        // this.loadElectives(); // Electives are now loaded dynamically based on program selection
    },

    setupEventListeners() {
        // Open modal buttons
        const applyButtons = document.querySelectorAll('[data-open-modal]');
        applyButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                // Check if this button is for brochure download
                const isDownloadBtn = btn.hasAttribute('data-download-brochure');
                this.openModal(isDownloadBtn);
            });
        });

        // Close modal
        const closeBtn = document.getElementById('closeApplicationModal');
        const backdrop = document.getElementById('modalBackdrop');

        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeModal());
        }

        if (backdrop) {
            backdrop.addEventListener('click', () => this.closeModal());
        }

        // Step 1 form submission
        const step1Form = document.getElementById('step1Form');
        if (step1Form) {
            step1Form.addEventListener('submit', (e) => this.handleStep1Submit(e));
        }

        // Step 2 form submission
        const step2Form = document.getElementById('step2Form');
        if (step2Form) {
            step2Form.addEventListener('submit', (e) => this.handleStep2Submit(e));
        }

        // ESC key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeModal();
            }
        });

        // Program Selection change listener
        const programSelect = document.getElementById('modalProgram');
        if (programSelect) {
            programSelect.addEventListener('change', (e) => {
                this.loadElectives(e.target.value);
            });
        }
    },

    loadElectives(programSlug) {
        const electiveSelect = document.getElementById('programElective');
        if (electiveSelect) {
            electiveSelect.innerHTML = '<option value="" disabled selected>Select Elective</option>';

            const selectedProgram = this.programs.find(p => p.slug === programSlug);

            if (selectedProgram && selectedProgram.electives) {
                selectedProgram.electives.forEach(elective => {
                    const option = document.createElement('option');
                    option.value = elective.slug;
                    option.textContent = elective.name;
                    electiveSelect.appendChild(option);
                });
                electiveSelect.disabled = false;
            } else {
                // If no program selected or no electives found, disable or show generic message
                electiveSelect.disabled = true;
            }
        }
    },

    openModal(downloadMode = false) {
        const modal = document.getElementById('applicationModal');
        if (modal) {
            modal.classList.remove('hidden');
            this.isOpen = true;
            this.downloadBrochure = downloadMode;
            this.currentStep = 1;
            this.showStep(1);
            document.body.style.overflow = 'hidden';

            // Optional: Update modal title or button text based on mode
            const submitBtn = document.querySelector('#step2Form button[type="submit"]');
            if (submitBtn) {
                if (this.downloadBrochure) {
                    submitBtn.innerHTML = 'Download Brochure <i class="fas fa-download group-hover:scale-110 transition-transform"></i>';
                } else {
                    submitBtn.innerHTML = 'Submit Final Application <i class="fas fa-check-circle group-hover:scale-110 transition-transform"></i>';
                }
            }
        }
    },

    closeModal() {
        const modal = document.getElementById('applicationModal');
        if (modal) {
            modal.classList.add('hidden');
            this.isOpen = false;
            this.currentStep = 1;
            this.resetForm();
            document.body.style.overflow = '';
        }
    },

    showStep(step) {
        const step1 = document.getElementById('modalStep1');
        const step2 = document.getElementById('modalStep2');

        if (step === 1) {
            step1?.classList.remove('hidden');
            step2?.classList.add('hidden');
        } else {
            step1?.classList.add('hidden');
            step2?.classList.remove('hidden');
        }
        this.currentStep = step;
    },

    async handleStep1Submit(e) {
        e.preventDefault();

        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Processing...';

        // Collect form data
        this.formData.name = document.getElementById('step1Name').value;
        this.formData.email = document.getElementById('step1Email').value;
        this.formData.phone = document.getElementById('step1Phone').value;
        this.formData.work_experience = document.getElementById('step1Experience').value;


        try {
            await this.submitStep1Data();
            setTimeout(() => {
                this.showStep(2);
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }, 500);
        } catch (error) {
            console.error('Step 1 submission failed:', error);
            this.showStep(2);
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    },

    async handleStep2Submit(e) {
        e.preventDefault();

        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Submitting...';

        // Collect remaining form data
        this.formData.programName = document.getElementById('modalProgram').value;
        this.formData.highest_qualification = document.getElementById('qualification').value;
        this.formData.current_professional_situation = document.getElementById('situation').value;

        try {
            await this.submitFinalApplication();
            // Facebook Pixel Track Lead
            // if (typeof fbq === 'function') {
            //     fbq('track', 'Lead');
            // }
            this.closeModal();
            // showSuccessModal();
            if (this.downloadBrochure) {
                downloadBrochure();
            }
            window.location.href = 'thank-you.html';
        } catch (error) {
            console.error('Final submission failed:', error);
            this.closeModal();
            // showSuccessModal();
            window.location.href = 'thank-you.html';
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    },

    async submitStep1Data() {
        console.log('Modal Step 1 Data:', this.formData);
        try {
            await submitToSuperleap({
                ...this.formData,
                timestamp: new Date().toISOString()
            });
        } catch (error) {
            console.warn('Superleap submission failed, but continuing...', error);
        }
        return new Promise(r => setTimeout(r, 800));
    },

    async submitFinalApplication() {
        console.log('Modal Final Data:', this.formData);
        try {
            await submitToSuperleap({
                ...this.formData,
                timestamp: new Date().toISOString()
            });
        } catch (error) {
            console.warn('Superleap submission failed, but continuing...', error);
        }
        return new Promise(r => setTimeout(r, 1000));
    },

    resetForm() {
        const step1Form = document.getElementById('step1Form');
        const step2Form = document.getElementById('step2Form');
        if (step1Form) step1Form.reset();
        if (step2Form) step2Form.reset();
    }
};



// Common Functions
// function showSuccessModal() {
//     const successModal = document.getElementById('successModal');
//     if (successModal) {
//         successModal.classList.remove('hidden');
//     }
// }

// PDF Download Helper
function downloadBrochure() {
    const link = document.createElement('a');
    link.href = 'https://onlinejain.com/pdf/2025/program/jo-overall-brochure.pdf'; // Ensure this file exists or use a valid URL
    link.download = 'JAIN_Online_Brochure.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Countdown Timer
function startCountdown(duration) {
    let timer = duration, days, hours, minutes, seconds;

    setInterval(function () {
        days = parseInt(timer / (60 * 60 * 24), 10);
        hours = parseInt((timer % (60 * 60 * 24)) / (60 * 60), 10);
        minutes = parseInt((timer % (60 * 60)) / 60, 10);
        seconds = parseInt(timer % 60, 10);

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (daysEl) daysEl.textContent = days < 10 ? "0" + days : days;
        if (hoursEl) hoursEl.textContent = hours < 10 ? "0" + hours : hours;
        if (minutesEl) minutesEl.textContent = minutes < 10 ? "0" + minutes : minutes;
        if (secondsEl) secondsEl.textContent = seconds < 10 ? "0" + seconds : seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

// Smooth Scroll
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Success Modal Close
function setupSuccessModalClose() {
    const closeModalBtn = document.getElementById('closeModal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function () {
            document.getElementById('successModal').classList.add('hidden');
        });
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    ApplicationModal.init();
    setupSmoothScroll();
    setupSuccessModalClose();
    startCountdown(228600);
});


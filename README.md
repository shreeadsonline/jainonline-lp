# JAIN University Landing Page - Application Modal Documentation

## Overview
This landing page includes a comprehensive two-step application modal system with all required fields for student applications to JAIN University's online degree programs.

## File Structure

```
jain-landing-page/
├── index.html              # Main landing page
├── js/
│   └── application.js      # Application modal logic and form handling
├── modal.html              # Standalone modal HTML (reference)
└── README.md              # This file
```

## Features

### Two-Step Application Form

#### Step 1: Basic Information
- **Full Name** (required)
- **Email Address** (required)
- **Phone Number** (required, 10 digits)
- **Work Experience** (required dropdown)
  - Freshers
  - 0-2 Years
  - 2-5 Years
  - 5-10 Years
  - 10+ Years
- **Program Selection** (dropdown)
  - MBA - Master of Business Administration
  - MCA - Master of Computer Applications
  - M.COM - Master of Commerce
  - MA - Master of Arts
  - BBA - Bachelor of Business Administration
  - BCA - Bachelor of Computer Applications
  - BA - Bachelor of Arts

#### Step 2: Additional Details
- **Highest Qualification** (required dropdown)
  - B.Tech/BE (any)
  - BSc (any)
  - BBA
  - B.Com
  - BA
  - MSc (any)
  - MCA
  - MBA
  - M.Com
  - MA
  - PhD (any)
  - Other

- **Program Elective** (required, MBA specific)
  - General Management
  - Digital Marketing
  - Finance
  - Human Resources
  - Operations Management
  - Business Analytics
  - Entrepreneurship
  - International Business

- **Current Professional Situation** (required dropdown)
  - Employed
  - Intern
  - Self-employed
  - Freelancer
  - Student
  - Between Jobs
  - Other

- **LinkedIn Profile URL** (optional)

## How to Trigger the Modal

### Method 1: Add data attribute to any button
```html
<button data-open-modal>Apply Now</button>
```

### Method 2: Call JavaScript function
```javascript
ApplicationModal.openModal();
```

## JavaScript API

### ApplicationModal Object

The `ApplicationModal` object provides the following methods:

#### `init()`
Initializes the modal system. Called automatically on page load.

#### `openModal()`
Opens the application modal.

#### `closeModal()`
Closes the modal and resets the form.

#### `showStep(stepNumber)`
Shows a specific step (1 or 2).

### Form Data Structure

```javascript
{
    name: '',
    email: '',
    phone: '',
    program: '',
    experience: '',
    qualification: '',
    programElective: '',
    situation: '',
    linkedin: ''
}
```

## Customization

### Adding More Electives

Edit the `electives` array in `js/application.js`:

```javascript
electives: [
    { id: 'your-elective-slug', name: 'Your Elective Name' },
    // ... more electives
]
```

### Changing API Endpoints

Update the `submitStep1Data()` and `submitFinalApplication()` methods in `js/application.js`:

```javascript
async submitStep1Data() {
    const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: this.formData.name,
            email: this.formData.email,
            phone: this.formData.phone,
            experience: this.formData.experience
        })
    });
    return response.json();
}
```

### Styling

The modal uses Tailwind CSS classes. Key styling elements:

- **Primary Color**: `#FFD500` (Yellow)
- **Secondary Color**: Blue gradient (`from-blue-600 to-indigo-600`)
- **Border Radius**: `rounded-lg` (8px), `rounded-xl` (12px)
- **Transitions**: All interactive elements have smooth transitions

## Additional Features

### Countdown Timer
A real-time countdown timer showing days, hours, minutes, and seconds until admission closes.

### Form Validation
- HTML5 validation for required fields
- Pattern validation for phone numbers (10 digits)
- URL validation for LinkedIn profiles

### Loading States
Both step 1 and step 2 forms show loading indicators during submission:
- Disabled button state
- Spinner icon
- "Processing..." / "Submitting..." text

### Keyboard Shortcuts
- **ESC**: Close the modal

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interface

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Dependencies

- **Tailwind CSS**: Via CDN
- **Font Awesome 6.4.0**: For icons
- **Google Fonts**: Inter & Poppins

## Integration with Backend

To integrate with your backend API:

1. Update the API endpoints in `js/application.js`
2. Add proper error handling
3. Implement success/failure callbacks
4. Add analytics tracking if needed

Example:

```javascript
async submitFinalApplication() {
    try {
        const response = await fetch('/api/applications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.formData)
        });
        
        if (!response.ok) {
            throw new Error('Submission failed');
        }
        
        const result = await response.json();
        
        // Track with analytics
        if (window.gtag) {
            gtag('event', 'application_submitted', {
                program: this.formData.program,
                elective: this.formData.programElective
            });
        }
        
        return result;
    } catch (error) {
        console.error('Application submission error:', error);
        throw error;
    }
}
```

## Testing

### Manual Testing Checklist

- [ ] Modal opens when clicking "Apply Now"
- [ ] Step 1 form validates all required fields
- [ ] Step 1 submission moves to Step 2
- [ ] Step 2 form validates all required fields
- [ ] Program electives populate correctly
- [ ] LinkedIn URL accepts valid URLs
- [ ] Modal closes on backdrop click
- [ ] Modal closes on ESC key
- [ ] Modal closes on X button
- [ ] Success modal appears after final submission
- [ ] Forms reset after closing modal
- [ ] Responsive design works on mobile
- [ ] Countdown timer updates correctly

## Troubleshooting

### Modal doesn't open
- Check if `js/application.js` is loaded
- Verify the button has `data-open-modal` attribute
- Check browser console for errors

### Electives not showing
- Verify `loadElectives()` is called in `init()`
- Check if `programElective` select element exists

### Form not submitting
- Check network tab for API errors
- Verify all required fields are filled
- Check browser console for validation errors

## Future Enhancements

- [ ] Add form field auto-save (localStorage)
- [ ] Implement multi-language support
- [ ] Add file upload for documents
- [ ] Implement OTP verification for phone
- [ ] Add social login options
- [ ] Implement progress indicator
- [ ] Add field-level validation messages
- [ ] Implement conditional fields based on program selection

## License

© 2026 JAIN Online (Deemed-to-be University). All rights reserved.

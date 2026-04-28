

window.addEventListener('DOMContentLoaded', event => {

    const buildQuoteSubject = () => {
        const serviceField = document.querySelector('#service');
        const fullNameField = document.querySelector('#fullName');
        const service = serviceField ? serviceField.value.trim() : '';
        const fullName = fullNameField ? fullNameField.value.trim() : '';
        const now = new Date();
        const pad = value => String(value).padStart(2, '0');
        const timestamp =
            now.getFullYear() + '-' +
            pad(now.getMonth() + 1) + '-' +
            pad(now.getDate()) + ' ' +
            pad(now.getHours()) + ':' +
            pad(now.getMinutes()) + ':' +
            pad(now.getSeconds());

        return 'Cotizacion - ' +
            (service || 'Servicio general') +
            ' - ' +
            (fullName || 'Cliente') +
            ' - ' +
            timestamp;
    };

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }
    };

    // Shrink the navbar
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    const contactForm = document.querySelector('#contactForm');
    const formSubject = document.querySelector('#formSubject');
    const submitButton = document.querySelector('#submitButton');
    const formSuccessMessage = document.querySelector('#formSuccessMessage');
    const formErrorMessage = document.querySelector('#formErrorMessage');
    if (contactForm) {
        contactForm.addEventListener('submit', function () {
            if (formSubject) {
                formSubject.value = buildQuoteSubject();
            }
        });
    }

    if (contactForm && window.location.protocol === 'file:') {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            const fullName = document.querySelector('#fullName').value.trim();
            const phone = document.querySelector('#phone').value.trim();
            const emailAddress = document.querySelector('#emailAddress').value.trim();
            const service = document.querySelector('#service').value.trim();
            const message = document.querySelector('#message').value.trim();

            const gmailComposeUrl =
                'https://mail.google.com/mail/?view=cm&fs=1' +
                '&to=servicios.lylglobalservicios%40gmail.com' +
                '&su=' + encodeURIComponent(buildQuoteSubject()) +
                '&body=' + encodeURIComponent(
                    'Nombre: ' + fullName + '\n' +
                    'Telefono o WhatsApp: ' + phone + '\n' +
                    'Correo: ' + emailAddress + '\n' +
                    'Servicio: ' + service + '\n\n' +
                    'Detalle del trabajo:\n' + message
                );

            window.open(gmailComposeUrl, '_blank', 'noopener,noreferrer');
            contactForm.reset();
        });
    }

    if (contactForm && window.location.protocol !== 'file:') {
        contactForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            if (formSubject) {
                formSubject.value = buildQuoteSubject();
            }

            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Enviando...';
            }

            if (formSuccessMessage) {
                formSuccessMessage.classList.add('d-none');
            }
            if (formErrorMessage) {
                formErrorMessage.classList.add('d-none');
            }

            try {
                const formData = new FormData(contactForm);
                const response = await fetch('https://formsubmit.co/ajax/servicios.lylglobalservicios@gmail.com', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('FormSubmit request failed');
                }

                const result = await response.json();
                if (result.success !== 'true' && result.success !== true) {
                    throw new Error('FormSubmit rejected submission');
                }

                contactForm.reset();
                if (formSuccessMessage) {
                    formSuccessMessage.classList.remove('d-none');
                }
            } catch (error) {
                if (formErrorMessage) {
                    formErrorMessage.classList.remove('d-none');
                }
            } finally {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Enviar Solicitud';
                }
            }
        });
    }

});

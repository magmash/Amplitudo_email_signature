// File: script.js

document.addEventListener('DOMContentLoaded', () => {
    // Get references to HTML elements
    const fullNameInput = document.getElementById('fullName');
    const jobTitleInput = document.getElementById('jobTitle');
    const phoneInput = document.getElementById('phone');
    const generateBtn = document.getElementById('generateBtn');
    const outputContainer = document.getElementById('outputContainer');
    const signaturePreview = document.getElementById('signaturePreview');
    const signatureHtml = document.getElementById('signatureHtml');
    const copyHtmlBtn = document.getElementById('copyHtmlBtn');
    const copySignatureBtn = document.getElementById('copySignatureBtn');
    const copyStatus = document.getElementById('copyStatus');
    const instructionsContainer = document.getElementById('instructionsContainer');

    // --- *** YOUR CUSTOMIZATION AREA START *** ---

    // 1. Company Logo URL & Style (Points to repo image)
    const companyLogoUrl = 'https://magmash.github.io/Amplitudo_email_signature/ikonice/amplitudo.png';
    // Define desired display width for logos (used in attributes and styles)
    const companyLogoWidth = "130"; // Width in pixels (as string for attribute)
    const logoStyle = `width: ${companyLogoWidth}px; max-width: ${companyLogoWidth}px; height: auto; border: 0; display: block; margin-bottom: 12px; -ms-interpolation-mode: bicubic; /* Smoother resize in Outlook */`;

    // 2. Icon URLs and Styles
    const iconBaseUrl = "https://magmash.github.io/Amplitudo_email_signature/ikonice/";
    const linkedinIconUrl = `${iconBaseUrl}Linkedin.png`;
    const facebookIconUrl = `${iconBaseUrl}Facebook.png`;
    const instagramIconUrl = `${iconBaseUrl}Instagram.png`;
    const phoneIconUrl = `${iconBaseUrl}Phone.png`;
    const emailIconUrl = `${iconBaseUrl}Email.png`;
    const addressIconUrl = `${iconBaseUrl}Address.png`;
    const websiteIconUrl = `${iconBaseUrl}website.png`;
    const bannerImageUrl = `${iconBaseUrl}banner.png`;

    // Social Page URLs
    const facebookPageUrl = "https://www.facebook.com/AmplitudoCG/";
    const linkedinPageUrl = "https://me.linkedin.com/company/amplitudoo";
    const instagramPageUrl = "https://www.instagram.com/amplitudo.me/?hl=en";
    const websiteUrl = "https://amplitudo.me/";

    // Define Icon Styles & Attributes
    const contactIconSize = "16"; // Size as string for attributes
    const contactIconStyle = `width: ${contactIconSize}px; height: ${contactIconSize}px; border: 0; vertical-align: middle; -ms-interpolation-mode: bicubic;`;
    const socialIconSize = "20"; // Size as string for attributes
    const socialIconStyle = `width: ${socialIconSize}px; height: ${socialIconSize}px; border: 0; vertical-align: middle; -ms-interpolation-mode: bicubic;`;
    // Define Banner Style & Attributes
    const bannerMaxWidth = "580"; // Match max-width of main table
    const bannerStyle = `display: block; max-width: ${bannerMaxWidth}px; width: 100%; height: auto; border: 0; margin-top: 15px; -ms-interpolation-mode: bicubic;`;
    const bannerLinkStyle = "display: block; text-decoration: none;";


    // 3. Define the HTML Signature Template Function (Compatibility Enhancements)
    function getSignatureTemplate(data) {
        // Define Styles
        const baseFont = "font-family: Verdana, Geneva, sans-serif;";
        const baseFontSize = "font-size: 9pt;";
        const primaryColor = "#384F63;";
        const accentColor = "#00B9AD;";
        const lightGrayBorder = "#E5E7EB;";

        const nameStyle = `${baseFont} font-size: 14pt; font-weight: 700; color: ${primaryColor} line-height: 1.3; margin: 0 0 1px 0;`;
        const titleStyle = `${baseFont} font-size: 10pt; font-weight: 400; color: ${accentColor} line-height: 1.3; margin: 0 0 12px 0; text-transform: uppercase;`;
        const contactStyle = `${baseFont} ${baseFontSize} font-weight: 400; color: ${primaryColor} line-height: 1.4; margin: 0;`;
        const contactLinkStyle = `color: ${primaryColor} text-decoration: none;`;
        const iconCellStyle = `width: ${contactIconSize}px; padding-right: 8px; vertical-align: middle; line-height: 1; /* Helps some clients with image spacing */`;
        const socialLinkStyle = `color: #4B5563; text-decoration: none; ${baseFont} font-size: 10pt; vertical-align: middle;`;

        const fixedAddress = "Bulevar knjaza Danila Petrovića 13/32,<br>Podgorica, Montenegro";
        const fixedPhoneRight = "+382 20 223 244";
        const websiteText = "amplitudo.me";

        // Build social icons HTML string
        // Added MSO spacing styles
        const socialIconsHtml = `
          <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
            <tr>
              <td style="padding: 2px 8px 2px 0; vertical-align: middle; line-height: 1;">
                <a href="${linkedinPageUrl}" target="_blank">
                  <img src="${linkedinIconUrl}" alt="LinkedIn" width="${socialIconSize}" height="${socialIconSize}" style="${socialIconStyle}">
                </a>
              </td>
              <td style="padding: 2px 0; vertical-align: middle;">
                 <a href="${linkedinPageUrl}" target="_blank" style="${socialLinkStyle}">LinkedIn</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 2px 8px 2px 0; vertical-align: middle; line-height: 1;">
                <a href="${facebookPageUrl}" target="_blank">
                  <img src="${facebookIconUrl}" alt="Facebook" width="${socialIconSize}" height="${socialIconSize}" style="${socialIconStyle}">
                </a>
              </td>
              <td style="padding: 2px 0; vertical-align: middle;">
                 <a href="${facebookPageUrl}" target="_blank" style="${socialLinkStyle}">Facebook</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 2px 8px 2px 0; vertical-align: middle; line-height: 1;">
                 <a href="${instagramPageUrl}" target="_blank">
                   <img src="${instagramIconUrl}" alt="Instagram" width="${socialIconSize}" height="${socialIconSize}" style="${socialIconStyle}">
                 </a>
              </td>
              <td style="padding: 2px 0; vertical-align: middle;">
                 <a href="${instagramPageUrl}" target="_blank" style="${socialLinkStyle}">Instagram</a>
              </td>
            </tr>
          </table>
        `;

        // Main Structure: Outer wrapper, main signature table, banner link/image
        return `
<div style="${baseFont} ${baseFontSize}"> <!-- Ensure base font styles apply -->
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; background-color: #FFFFFF; max-width: 580px; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
    <tr>
      <!-- Left Column: Info -->
      <td width="57%" style="padding: 15px; vertical-align: top; width: 57%;">
        <p style="${nameStyle}">${data.fullName}</p>
        <p style="${titleStyle}">${data.jobTitle}</p>
        <!-- Contact Info Table -->
        <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
          <tr>
             <td style="${iconCellStyle}">
                <img src="${phoneIconUrl}" alt="P" width="${contactIconSize}" height="${contactIconSize}" style="${contactIconStyle}">
             </td>
             <td style="vertical-align: middle;"><p style="${contactStyle}">${data.phone}</p></td>
          </tr>
          <tr><td colspan="2" style="height: 6px; line-height: 6px; font-size: 6px;"> </td></tr> <!-- Smaller spacer -->
          <tr>
             <td style="${iconCellStyle}">
                <img src="${emailIconUrl}" alt="E" width="${contactIconSize}" height="${contactIconSize}" style="${contactIconStyle}">
             </td>
             <td style="vertical-align: middle;"><a href="mailto:${data.email}" style="${contactLinkStyle} ${contactStyle}">${data.email}</a></td>
          </tr>
          <tr><td colspan="2" style="height: 6px; line-height: 6px; font-size: 6px;"> </td></tr>
          <tr>
             <td style="${iconCellStyle}">
                <img src="${addressIconUrl}" alt="A" width="${contactIconSize}" height="${contactIconSize}" style="${contactIconStyle}">
             </td>
             <td style="vertical-align: middle;"><p style="${contactStyle}">${fixedAddress}</p></td>
          </tr>
        </table>
      </td>
      <!-- Vertical Divider -->
      <td width="1" style="width: 1px; padding: 0; background-color: ${lightGrayBorder};"><div style="width:1px; line-height: 1px; font-size: 1px;"> </div></td>
      <!-- Right Column: Logo & Static Info -->
      <td width="42%" style="padding: 15px 15px 15px 30px; vertical-align: top; width: 42%; text-align: left;">
         ${data.logoHtml ? data.logoHtml : ''} <!-- logoHtml includes width attribute -->
         <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-bottom: 6px; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
            <tr>
               <td style="${iconCellStyle}">
                  <img src="${phoneIconUrl}" alt="T" width="${contactIconSize}" height="${contactIconSize}" style="${contactIconStyle}">
               </td>
               <td style="vertical-align: middle;"><p style="${contactStyle}">${fixedPhoneRight}</p></td>
            </tr>
         </table>
         <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-bottom: 12px; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
             <tr>
                 <td style="${iconCellStyle}">
                     <a href="${websiteUrl}" target="_blank">
                        <img src="${websiteIconUrl}" alt="W" width="${contactIconSize}" height="${contactIconSize}" style="${contactIconStyle}">
                     </a>
                 </td>
                 <td style="vertical-align: middle;">
                    <a href="${websiteUrl}" target="_blank" style="${contactLinkStyle} ${contactStyle}">${websiteText}</a>
                 </td>
             </tr>
         </table>
         ${socialIconsHtml}
      </td>
    </tr>
  </table>
  <!-- Banner Below Table -->
  <div style="margin-top: 15px; max-width: 580px; width: 100%;"> <!-- Outer div for width control -->
     <a href="${websiteUrl}" target="_blank" style="${bannerLinkStyle}">
        <img src="${bannerImageUrl}" alt="Amplitudo Banner" width="${bannerMaxWidth}" style="${bannerStyle}"> <!-- Added width attribute -->
     </a>
  </div>
</div> <!-- End Outer div -->
        `;
    }
    // --- *** YOUR CUSTOMIZATION AREA END *** ---

    // Helper function to transliterate
    function transliterate(text) {
        const charMap = {'ć':'c','č':'c','š':'s','ž':'z','đ':'dj','Ć':'C','Č':'C','Š':'S','Ž':'Z','Đ':'Dj'};
        let result = text;
        for (const [key, value] of Object.entries(charMap)) { result = result.replace(new RegExp(key, 'g'), value); }
        return result;
    }

    // Helper function to capitalize
    function capitalizeFullName(fullName) {
         if (!fullName) return '';
         return fullName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    }

    // --- Event Listeners ---
    generateBtn.addEventListener('click', generateSignature);
    copySignatureBtn.addEventListener('click', copySignaturePreview);
    copyHtmlBtn.addEventListener('click', copyHtmlCode);
    if (phoneInput) { phoneInput.addEventListener('input', () => { phoneInput.value = phoneInput.value.replace(/[^0-9\+\-\s\(\)xX]/g, ''); }); }

    // --- Functions ---
     function generateSignature() {
        clearCopyStatus();
        const fullNameRaw = fullNameInput.value.trim();
        const jobTitleRaw = jobTitleInput.value.trim();
        const phone = phoneInput.value.trim();

        if (!fullNameRaw || !jobTitleRaw || !phone) {
            alert('Please fill in all fields (Full Name, Job Title, Phone Number).');
            return;
        }
        const nameParts = fullNameRaw.split(' ').filter(part => part.length > 0);
        if (nameParts.length < 2) {
            alert('Please enter at least a first name and a surname.');
            return;
        }
        const firstNameForEmail = nameParts[0];
        const surnameForEmail = nameParts[nameParts.length - 1];
        const transliteratedFirstName = transliterate(firstNameForEmail).toLowerCase();
        const transliteratedSurname = transliterate(surnameForEmail).toLowerCase();
        const emailPrefix = `${transliteratedFirstName}.${transliteratedSurname}`;
        const fullEmail = `${emailPrefix}@amplitudo.me`;
        const displayFullName = capitalizeFullName(fullNameRaw);
        const displayJobTitle = jobTitleRaw.toUpperCase();

        const employeeData = {
            fullName: displayFullName,
            jobTitle: displayJobTitle,
            phone: phone,
            email: fullEmail,
             // *** ADD HTML width attribute to logo ***
            logoHtml: companyLogoUrl ? `<img src="${companyLogoUrl}" alt="Company Logo" width="${companyLogoWidth}" style="${logoStyle}">` : ''
        };

        try {
            const finalSignatureHtml = getSignatureTemplate(employeeData);
            signaturePreview.innerHTML = finalSignatureHtml;
            signatureHtml.value = finalSignatureHtml;
            if (outputContainer) outputContainer.style.display = 'block';
            if (instructionsContainer) instructionsContainer.style.display = 'block';
        } catch (error) {
             console.error("Error during signature generation:", error);
             alert("An error occurred while generating the signature. Please check the console for details.");
        }
    } // End generateSignature

    function copySignaturePreview() {
        clearCopyStatus();
        const range = document.createRange();
        range.selectNodeContents(signaturePreview);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        try {
            const successful = document.execCommand('copy');
            setCopyStatus(successful ? 'Signature copied successfully!' : 'Failed to copy signature.', successful);
        } catch (err) {
            console.error('Failed to copy signature preview: ', err);
            setCopyStatus('Error copying signature.', false);
        }
        selection.removeAllRanges();
    }

    function copyHtmlCode() {
        clearCopyStatus();
        if (!signatureHtml.value) return;
        signatureHtml.select();
        signatureHtml.setSelectionRange(0, 99999);
        try {
            navigator.clipboard.writeText(signatureHtml.value).then(() => {
                setCopyStatus('HTML code copied!', true);
            }).catch(err => {
                console.warn('Navigator clipboard failed, trying execCommand: ', err);
                const successful = document.execCommand('copy');
                setCopyStatus(successful ? 'HTML code copied! (fallback)' : 'Failed to copy HTML code.', successful);
            });
        } catch (err) {
            console.error('Failed to copy HTML code: ', err);
            setCopyStatus('Error copying HTML code.', false);
        }
    }

    function setCopyStatus(message, success) {
        copyStatus.textContent = message;
        copyStatus.className = `copy-status ${success ? 'success' : 'error'}`;
        setTimeout(clearCopyStatus, 4000);
    }

    function clearCopyStatus() {
        copyStatus.textContent = '';
        copyStatus.className = 'copy-status';
    }

}); // End DOMContentLoaded

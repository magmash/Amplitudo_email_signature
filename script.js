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
    // Keep logo width reasonable relative to new signature width
    const companyLogoWidth = "120"; // Reduced slightly from 130
    const logoStyle = `width: ${companyLogoWidth}px; max-width: ${companyLogoWidth}px; height: auto; border: 0; display: block; margin-bottom: 10px; -ms-interpolation-mode: bicubic;`; // Reduced margin

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
    const contactIconSize = "14"; // Slightly smaller contact icons
    const contactIconStyle = `width: ${contactIconSize}px; height: ${contactIconSize}px; border: 0; vertical-align: middle; -ms-interpolation-mode: bicubic;`;
    const socialIconSize = "18"; // Slightly smaller social icons
    const socialIconStyle = `width: ${socialIconSize}px; height: ${socialIconSize}px; border: 0; vertical-align: middle; -ms-interpolation-mode: bicubic;`;

    // Define Banner Style & Attributes - matching new max-width
    // *** REDUCED MAX WIDTH ***
    const signatureMaxWidth = "500"; // Reduced from 580
    const bannerStyle = `display: block; max-width: ${signatureMaxWidth}px; width: 100%; height: auto; border: 0; margin-top: 12px; -ms-interpolation-mode: bicubic;`; // Reduced margin
    const bannerLinkStyle = "display: block; text-decoration: none;";


    // 3. Define the HTML Signature Template Function (Narrower Layout)
    function getSignatureTemplate(data) {
        // Define Styles
        const baseFont = "font-family: Verdana, Geneva, sans-serif;";
        const baseFontSize = "font-size: 8.5pt;"; // Slightly smaller base font
        const primaryColor = "#384F63;";
        const accentColor = "#00B9AD;";
        const lightGrayBorder = "#E5E7EB;";

        const nameStyle = `${baseFont} font-size: 13pt; font-weight: 700; color: ${primaryColor} line-height: 1.3; margin: 0 0 1px 0;`; // Slightly smaller name
        const titleStyle = `${baseFont} font-size: 9pt; font-weight: 400; color: ${accentColor} line-height: 1.3; margin: 0 0 10px 0; text-transform: uppercase;`; // Slightly smaller title
        const contactStyle = `${baseFont} ${baseFontSize} font-weight: 400; color: ${primaryColor} line-height: 1.4; margin: 0;`;
        const contactLinkStyle = `color: ${primaryColor} text-decoration: none;`;
        const iconCellStyle = `width: ${contactIconSize}px; padding-right: 6px; vertical-align: middle; line-height: 1;`; // Reduced padding right slightly
        const socialLinkStyle = `color: #4B5563; text-decoration: none; ${baseFont} font-size: 9pt; vertical-align: middle;`; // Matched base font size

        const fixedAddress = "Bulevar knjaza Danila Petrovića 13/32,<br>Podgorica, Montenegro";
        const fixedPhoneRight = "+382 20 223 244";
        const websiteText = "amplitudo.me";

        // Build social icons HTML string
        const socialIconsHtml = `
          <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
            <tr>
              <td style="padding: 2px 6px 2px 0; vertical-align: middle; line-height: 1;"> <!-- Reduced padding -->
                <a href="${linkedinPageUrl}" target="_blank">
                  <img src="${linkedinIconUrl}" alt="LinkedIn" width="${socialIconSize}" height="${socialIconSize}" style="${socialIconStyle}">
                </a>
              </td>
              <td style="padding: 2px 0; vertical-align: middle;">
                 <a href="${linkedinPageUrl}" target="_blank" style="${socialLinkStyle}">LinkedIn</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 2px 6px 2px 0; vertical-align: middle; line-height: 1;"> <!-- Reduced padding -->
                <a href="${facebookPageUrl}" target="_blank">
                  <img src="${facebookIconUrl}" alt="Facebook" width="${socialIconSize}" height="${socialIconSize}" style="${socialIconStyle}">
                </a>
              </td>
              <td style="padding: 2px 0; vertical-align: middle;">
                 <a href="${facebookPageUrl}" target="_blank" style="${socialLinkStyle}">Facebook</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 2px 6px 2px 0; vertical-align: middle; line-height: 1;"> <!-- Reduced padding -->
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

        // Main Structure: Reduced max-width and padding
        return `
<div style="${baseFont} ${baseFontSize}">
  <!-- *** REDUCED MAX-WIDTH *** -->
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; background-color: #FFFFFF; max-width: ${signatureMaxWidth}px; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
    <tr>
      <!-- Left Column: Info -->
      <!-- *** REDUCED PADDING *** -->
      <td width="57%" style="padding: 12px; vertical-align: top; width: 57%;">
        <p style="${nameStyle}">${data.fullName}</p>
        <p style="${titleStyle}">${data.jobTitle}</p>
        <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
          <tr>
             <td style="${iconCellStyle}">
                <img src="${phoneIconUrl}" alt="P" width="${contactIconSize}" height="${contactIconSize}" style="${contactIconStyle}">
             </td>
             <td style="vertical-align: middle;"><p style="${contactStyle}">${data.phone}</p></td>
          </tr>
          <tr><td colspan="2" style="height: 5px; line-height: 5px; font-size: 5px;"> </td></tr> <!-- Smaller spacer -->
          <tr>
             <td style="${iconCellStyle}">
                <img src="${emailIconUrl}" alt="E" width="${contactIconSize}" height="${contactIconSize}" style="${contactIconStyle}">
             </td>
             <td style="vertical-align: middle;"><a href="mailto:${data.email}" style="${contactLinkStyle} ${contactStyle}">${data.email}</a></td>
          </tr>
          <tr><td colspan="2" style="height: 5px; line-height: 5px; font-size: 5px;"> </td></tr>
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
      <!-- *** REDUCED PADDING *** -->
      <td width="42%" style="padding: 12px 12px 12px 24px; vertical-align: top; width: 42%; text-align: left;">
         ${data.logoHtml ? data.logoHtml : ''}
         <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-bottom: 5px; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
            <tr>
               <td style="${iconCellStyle}">
                  <img src="${phoneIconUrl}" alt="T" width="${contactIconSize}" height="${contactIconSize}" style="${contactIconStyle}">
               </td>
               <td style="vertical-align: middle;"><p style="${contactStyle}">${fixedPhoneRight}</p></td>
            </tr>
         </table>
         <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-bottom: 10px; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
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
  <!-- *** REDUCED MAX-WIDTH FOR BANNER DIV *** -->
  <div style="margin-top: 12px; max-width: ${signatureMaxWidth}px; width: 100%;">
     <a href="${websiteUrl}" target="_blank" style="${bannerLinkStyle}">
        <!-- *** UPDATED BANNER WIDTH ATTRIBUTE *** -->
        <img src="${bannerImageUrl}" alt="Amplitudo Banner" width="${signatureMaxWidth}" style="${bannerStyle}">
     </a>
  </div>
</div>
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
            logoHtml: companyLogoUrl ? `<img src="${companyLogoUrl}" alt="Company Logo" width="${companyLogoWidth}" style="${logoStyle}">` : '' // Includes width attribute
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

    // (copySignaturePreview, copyHtmlCode, setCopyStatus, clearCopyStatus functions remain the same)
    function copySignaturePreview() { clearCopyStatus(); const range = document.createRange(); range.selectNodeContents(signaturePreview); const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range); try { const successful = document.execCommand('copy'); setCopyStatus(successful ? 'Signature copied successfully!' : 'Failed to copy signature.', successful); } catch (err) { console.error('Failed to copy signature preview: ', err); setCopyStatus('Error copying signature.', false); } selection.removeAllRanges(); }
    function copyHtmlCode() { clearCopyStatus(); if (!signatureHtml.value) return; signatureHtml.select(); signatureHtml.setSelectionRange(0, 99999); try { navigator.clipboard.writeText(signatureHtml.value).then(() => { setCopyStatus('HTML code copied!', true); }).catch(err => { console.warn('Navigator clipboard failed, trying execCommand: ', err); const successful = document.execCommand('copy'); setCopyStatus(successful ? 'HTML code copied! (fallback)' : 'Failed to copy HTML code.', successful); }); } catch (err) { console.error('Failed to copy HTML code: ', err); setCopyStatus('Error copying HTML code.', false); } }
    function setCopyStatus(message, success) { copyStatus.textContent = message; copyStatus.className = `copy-status ${success ? 'success' : 'error'}`; setTimeout(clearCopyStatus, 4000); }
    function clearCopyStatus() { copyStatus.textContent = ''; copyStatus.className = 'copy-status'; }

}); // End DOMContentLoaded

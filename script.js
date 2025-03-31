// File: script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Get references to HTML elements ---
    const fullNameInput = document.getElementById('fullName');
    const jobTitleInput = document.getElementById('jobTitle');
    const phoneInput = document.getElementById('phone');
    const generateBtn = document.getElementById('generateBtn');
    const outputContainer = document.getElementById('outputContainer');
    const signaturePreview = document.getElementById('signaturePreview');
    const copyStatus = document.getElementById('copyStatus');
    const instructionsContainer = document.getElementById('instructionsContainer');
    const copyGmailBtn = document.getElementById('copyGmailBtn');
    const copyOutlookBtn = document.getElementById('copyOutlookBtn');
    const copyAppleMailBtn = document.getElementById('copyAppleMailBtn');
    // copyRawHtmlBtn references removed

    // --- Global Variables & Configuration ---
    const companyLogoUrl = 'https://magmash.github.io/Amplitudo_email_signature/ikonice/amplitudo.png';
    const iconBaseUrl = "https://magmash.github.io/Amplitudo_email_signature/ikonice/";
    const signatureMaxWidth = "500";
    const companyLogoWidth = "120";
    const logoStyle = `width: ${companyLogoWidth}px; max-width: ${companyLogoWidth}px; height: auto; border: 0; display: block; margin-bottom: 10px; -ms-interpolation-mode: bicubic;`;

    // --- Helper Functions (transliterate, capitalizeFullName) ---
    function transliterate(text) { const charMap = {'ć':'c','č':'c','š':'s','ž':'z','đ':'dj','Ć':'C','Č':'C','Š':'S','Ž':'Z','Đ':'Dj'}; let result = text; for (const [key, value] of Object.entries(charMap)) { result = result.replace(new RegExp(key, 'g'), value); } return result; }
    function capitalizeFullName(fullName) { if (!fullName) return ''; return fullName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' '); }

    // --- Signature Template Functions ---

    // Base function to get common data and styles (REMOVED logoStyle from return)
    function getTemplateDataAndStyles(employeeData) {
        const baseFont = "font-family: Verdana, Geneva, sans-serif;"; const baseFontSize = "font-size: 8.5pt;";
        const primaryColor = "#384F63;"; const accentColor = "#00B9AD;"; const lightGrayBorder = "#E5E7EB;";
        const nameStyle = `${baseFont} font-size: 13pt; font-weight: 700; color: ${primaryColor} line-height: 1.3; margin: 0 0 1px 0;`;
        const titleStyle = `${baseFont} font-size: 9pt; font-weight: 400; color: ${accentColor} line-height: 1.3; margin: 0 0 10px 0; text-transform: uppercase;`;
        const contactStyle = `${baseFont} ${baseFontSize} font-weight: 400; color: ${primaryColor} line-height: 1.4; margin: 0;`;
        const contactLinkStyle = `color: ${primaryColor} text-decoration: none;`;
        const contactIconSize = "14";
        const contactIconStyle = `width: ${contactIconSize}px; height: ${contactIconSize}px; border: 0; vertical-align: middle; -ms-interpolation-mode: bicubic; display: inline-block; margin-right: 6px; /* Try inline-block for Apple */`;
        const socialLinkStyle = `color: #4B5563; text-decoration: none; ${baseFont} font-size: 9pt; vertical-align: middle;`;
        const socialIconSize = "18";
        const socialIconStyle = `width: ${socialIconSize}px; height: ${socialIconSize}px; border: 0; vertical-align: middle; -ms-interpolation-mode: bicubic; display: inline-block; margin-right: 6px; /* Try inline-block for Apple */`;
        const bannerStyle = `display: block; max-width: ${signatureMaxWidth}px; width: 100%; height: auto; border: 0; margin-top: 12px; -ms-interpolation-mode: bicubic;`;
        const bannerLinkStyle = "display: block; text-decoration: none;";
        const linkedinIconUrl = `${iconBaseUrl}Linkedin.png`; const facebookIconUrl = `${iconBaseUrl}Facebook.png`; const instagramIconUrl = `${iconBaseUrl}Instagram.png`;
        const phoneIconUrl = `${iconBaseUrl}Phone.png`; const emailIconUrl = `${iconBaseUrl}Email.png`; const addressIconUrl = `${iconBaseUrl}Address.png`;
        const websiteIconUrl = `${iconBaseUrl}website.png`; const bannerImageUrl = `${iconBaseUrl}banner.png`;
        const facebookPageUrl = "https://www.facebook.com/AmplitudoCG/"; const linkedinPageUrl = "https://me.linkedin.com/company/amplitudoo"; const instagramPageUrl = "https://www.instagram.com/amplitudo.me/?hl=en"; const websiteUrl = "https://amplitudo.me/";
        const fixedAddress = "Bulevar knjaza Danila Petrovića 13/32,<br>Podgorica, Montenegro"; const fixedPhoneRight = "+382 20 223 244"; const websiteText = "amplitudo.me";
        const logoHtml = employeeData.logoHtml;
        return { employeeData, baseFont, baseFontSize, primaryColor, accentColor, lightGrayBorder, nameStyle, titleStyle, contactStyle, contactLinkStyle, socialLinkStyle, bannerStyle, bannerLinkStyle, contactIconSize, contactIconStyle, socialIconSize, socialIconStyle, fixedAddress, fixedPhoneRight, websiteText, linkedinIconUrl, facebookIconUrl, instagramIconUrl, phoneIconUrl, emailIconUrl, addressIconUrl, websiteIconUrl, bannerImageUrl, linkedinPageUrl, facebookPageUrl, instagramPageUrl, websiteUrl, logoHtml };
    }

    // Template 1: Renamed for Web/Gmail (Pure Table, Robust)
    function getSignatureTemplateWeb(templateConfig) {
        const { employeeData, baseFont, baseFontSize, nameStyle, titleStyle, contactStyle, contactLinkStyle, /* iconCellStyle removed for specific implementation below */ socialLinkStyle, bannerStyle, bannerLinkStyle, contactIconSize, contactIconStyle, socialIconSize, socialIconStyle, fixedAddress, fixedPhoneRight, websiteText, linkedinIconUrl, facebookIconUrl, instagramIconUrl, phoneIconUrl, emailIconUrl, addressIconUrl, websiteIconUrl, bannerImageUrl, linkedinPageUrl, facebookPageUrl, instagramPageUrl, websiteUrl, logoHtml, lightGrayBorder } = templateConfig;
        const leftColWidthPx = Math.floor(signatureMaxWidth * 0.57); const rightColWidthPx = Math.floor(signatureMaxWidth * 0.42); const dividerWidthPx = 1;
        // Use specific cell style here for nested tables
        const nestedIconCellStyle = `width: ${contactIconSize}px; padding-right: 6px; vertical-align: middle; line-height: 1; white-space: nowrap;`;
        const socialIconsHtml = `<table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"><tr><td style="padding: 2px 6px 2px 0; vertical-align: middle; line-height: 1; white-space: nowrap;"><a href="${linkedinPageUrl}" target="_blank"><img src="${linkedinIconUrl}" alt="LinkedIn" width="${socialIconSize}" height="${socialIconSize}" style="${socialIconStyle}"></a></td><td style="padding: 2px 0; vertical-align: middle;"><a href="${linkedinPageUrl}" target="_blank" style="${socialLinkStyle}">LinkedIn</a></td></tr><tr><td style="padding: 2px 6px 2px 0; vertical-align: middle; line-height: 1; white-space: nowrap;"><a href="${facebookPageUrl}" target="_blank"><img src="${facebookIconUrl}" alt="Facebook" width="${socialIconSize}" height="${socialIconSize}" style="${socialIconStyle}"></a></td><td style="padding: 2px 0; vertical-align: middle;"><a href="${facebookPageUrl}" target="_blank" style="${socialLinkStyle}">Facebook</a></td></tr><tr><td style="padding: 2px 6px 2px 0; vertical-align: middle; line-height: 1; white-space: nowrap;"><a href="${instagramPageUrl}" target="_blank"><img src="${instagramIconUrl}" alt="Instagram" width="${socialIconSize}" height="${socialIconSize}" style="${socialIconStyle}"></a></td><td style="padding: 2px 0; vertical-align: middle;"><a href="${instagramPageUrl}" target="_blank" style="${socialLinkStyle}">Instagram</a></td></tr></table>`;
        return `<div style="${baseFont} ${baseFontSize}"><table role="presentation" border="0" cellpadding="0" cellspacing="0" width="${signatureMaxWidth}" style="border-collapse: collapse; background-color: #FFFFFF; width: ${signatureMaxWidth}px; max-width: ${signatureMaxWidth}px;"><tr><td width="${leftColWidthPx}" style="padding: 12px; vertical-align: top; width: ${leftColWidthPx}px;"><p style="${nameStyle}">${employeeData.fullName}</p><p style="${titleStyle}">${employeeData.jobTitle}</p><table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse;"><tr><td style="${nestedIconCellStyle}"><img src="${phoneIconUrl}" alt="P" width="${contactIconSize}" height="${contactIconSize}" style="${contactIconStyle}"></td><td style="vertical-align: middle; white-space: nowrap;"><p style="${contactStyle}">${employeeData.phone}</p></td></tr><tr><td colspan="2" style="height: 5px; line-height: 5px; font-size: 1px;"> </td></tr><tr><td style="${nestedIconCellStyle}"><img src="${emailIconUrl}" alt="E" width="${contactIconSize}" height="${contactIconSize}" style="${contactIconStyle}"></td><td style="vertical-align: middle; white-space: nowrap;"><a href="mailto:${employeeData.email}" style="${contactLinkStyle} ${contactStyle}">${employeeData.email}</a></td></tr><tr><td colspan="2" style="height: 5px; line-height: 5px; font-size: 1px;"> </td></tr><tr><td style="${nestedIconCellStyle}"><img src="${addressIconUrl}" alt="A" width="${contactIconSize}" height="${contactIconSize}" style="${contactIconStyle}"></td><td style="vertical-align: middle;"><p style="${contactStyle}">${fixedAddress}</p></td></tr></table></td><td width="${dividerWidthPx}" style="width: ${dividerWidthPx}px; padding: 0; background-color: ${lightGrayBorder}; vertical-align: top;"><div style="width:${dividerWidthPx}px; line-height: 1px; font-size: 1px; background-color:${lightGrayBorder};"> </div></td><td width="${rightColWidthPx}" style="padding: 12px 12px 12px 24px; vertical-align: top; width: ${rightColWidthPx}px; text-align: left;">${logoHtml ? logoHtml : ''}<table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-bottom: 5px;"><tr><td style="${nestedIconCellStyle}"><img src="${phoneIconUrl}" alt="T" width="${contactIconSize}" height="${contactIconSize}" style="${contactIconStyle}"></td><td style="vertical-align: middle; white-space: nowrap;"><p style="${contactStyle}">${fixedPhoneRight}</p></td></tr></table><table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-bottom: 10px;"><tr><td style="${nestedIconCellStyle}"><a href="${websiteUrl}" target="_blank"><img src="${websiteIconUrl}" alt="W" width="${contactIconSize}" height="${contactIconSize}" style="${contactIconStyle}"></a></td><td style="vertical-align: middle; white-space: nowrap;"><a href="${websiteUrl}" target="_blank" style="${contactLinkStyle} ${contactStyle}">${websiteText}</a></td></tr></table>${socialIconsHtml}</td></tr></table><div style="margin-top: 12px; max-width: ${signatureMaxWidth}px; width: 100%;"><a href="${websiteUrl}" target="_blank" style="${bannerLinkStyle}"><img src="${bannerImageUrl}" alt="Amplitudo Banner" width="${signatureMaxWidth}" style="${bannerStyle}"></a></div></div>`;
    }

    // Template 2: Added - Specifically for Apple Mail (Simplified Structure)
    function getSignatureTemplateAppleMail(templateConfig) {
        const { employeeData, baseFont, baseFontSize, nameStyle, titleStyle, contactStyle, contactLinkStyle, socialLinkStyle, bannerStyle, bannerLinkStyle, contactIconSize, contactIconStyle, socialIconSize, socialIconStyle, fixedAddress, fixedPhoneRight, websiteText, linkedinIconUrl, facebookIconUrl, instagramIconUrl, phoneIconUrl, emailIconUrl, addressIconUrl, websiteIconUrl, bannerImageUrl, linkedinPageUrl, facebookPageUrl, instagramPageUrl, websiteUrl, logoHtml, lightGrayBorder } = templateConfig;
        const leftColWidthPx = Math.floor(signatureMaxWidth * 0.57); const rightColWidthPx = Math.floor(signatureMaxWidth * 0.42); const dividerWidthPx = 1;
        const spacer = `<div style="height: 5px; line-height: 5px; font-size: 1px;"> </div>`; // Simple spacer

        // Main Structure: Pure table, explicit pixel widths, NO nested tables for contacts/social
        return `
<div style="${baseFont} ${baseFontSize}">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="${signatureMaxWidth}" style="border-collapse: collapse; background-color: #FFFFFF; width: ${signatureMaxWidth}px; max-width: ${signatureMaxWidth}px;">
    <tr>
      <!-- Left Column -->
      <td width="${leftColWidthPx}" style="padding: 12px; vertical-align: top; width: ${leftColWidthPx}px;">
        <p style="${nameStyle}">${employeeData.fullName}</p>
        <p style="${titleStyle}">${employeeData.jobTitle}</p>
        ${spacer}
        <p style="${contactStyle} line-height: 1.6;"> <!-- Slightly more line height -->
          <img src="${phoneIconUrl}" alt="P" width="${contactIconSize}" height="${contactIconSize}" style="${contactIconStyle}">
          <span style="white-space: nowrap;">${employeeData.phone}</span>
        </p>
        ${spacer}
        <p style="${contactStyle} line-height: 1.6;">
          <img src="${emailIconUrl}" alt="E" width="${contactIconSize}" height="${contactIconSize}" style="${contactIconStyle}">
          <a href="mailto:${employeeData.email}" style="${contactLinkStyle} white-space: nowrap;">${employeeData.email}</a>
        </p>
        ${spacer}
        <p style="${contactStyle} line-height: 1.6;">
          <img src="${addressIconUrl}" alt="A" width="${contactIconSize}" height="${contactIconSize}" style="${contactIconStyle}">
          ${fixedAddress} <!-- Address might wrap, that's okay -->
        </p>
      </td>
      <!-- Vertical Divider -->
      <td width="${dividerWidthPx}" style="width: ${dividerWidthPx}px; padding: 0; background-color: ${lightGrayBorder}; vertical-align: top;"><div style="width:${dividerWidthPx}px; line-height: 1px; font-size: 1px; background-color:${lightGrayBorder};"> </div></td>
      <!-- Right Column -->
      <td width="${rightColWidthPx}" style="padding: 12px 12px 12px 24px; vertical-align: top; width: ${rightColWidthPx}px; text-align: left;">
         ${logoHtml ? logoHtml : ''}
         <p style="${contactStyle} margin-bottom: 5px;">
            <img src="${phoneIconUrl}" alt="T" width="${contactIconSize}" height="${contactIconSize}" style="${contactIconStyle}">
            <span style="white-space: nowrap;">${fixedPhoneRight}</span>
         </p>
         <p style="${contactStyle} margin-bottom: 10px;">
            <a href="${websiteUrl}" target="_blank" style="${contactLinkStyle}">
                <img src="${websiteIconUrl}" alt="W" width="${contactIconSize}" height="${contactIconSize}" style="${contactIconStyle}">
                <span style="white-space: nowrap;">${websiteText}</span>
            </a>
         </p>
         <!-- Social Links using P tags -->
         <p style="margin: 0 0 4px 0;">
            <a href="${linkedinPageUrl}" target="_blank" style="${socialLinkStyle}">
               <img src="${linkedinIconUrl}" alt="LinkedIn" width="${socialIconSize}" height="${socialIconSize}" style="${socialIconStyle}"> LinkedIn
            </a>
         </p>
         <p style="margin: 0 0 4px 0;">
            <a href="${facebookPageUrl}" target="_blank" style="${socialLinkStyle}">
               <img src="${facebookIconUrl}" alt="Facebook" width="${socialIconSize}" height="${socialIconSize}" style="${socialIconStyle}"> Facebook
            </a>
         </p>
         <p style="margin: 0;">
            <a href="${instagramPageUrl}" target="_blank" style="${socialLinkStyle}">
               <img src="${instagramIconUrl}" alt="Instagram" width="${socialIconSize}" height="${socialIconSize}" style="${socialIconStyle}"> Instagram
            </a>
         </p>
      </td>
    </tr>
  </table>
  <div style="margin-top: 12px; max-width: ${signatureMaxWidth}px; width: 100%;"><a href="${websiteUrl}" target="_blank" style="${bannerLinkStyle}"><img src="${bannerImageUrl}" alt="Amplitudo Banner" width="${signatureMaxWidth}" style="${bannerStyle}"></a></div>
</div>`;
    }


     // Template 3: Optimized for Outlook (Based on Web template + MSO styles)
    function getSignatureTemplateOutlook(templateConfig) {
        // Start with the Web/Gmail template structure
        let outlookHtml = getSignatureTemplateWeb(templateConfig);
        // Add MSO specific line-height rules using simple string replace (might not be perfect but often helps)
        outlookHtml = outlookHtml.replace(/(<p style="[^"]+)/g, '$1 mso-line-height-rule: exactly;');
        outlookHtml = outlookHtml.replace(/(<div style="[^"]+)/g, '$1 mso-line-height-rule: exactly;');
        // Add MSO table spacing fixes
        outlookHtml = outlookHtml.replace(/(<table[^>]+)/g, '$1 style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"');

        return outlookHtml;
    }
    // --- End Signature Template Functions ---


    // --- Global Variable for Employee Data ---
    let currentEmployeeData = null;
    let previewHtmlCache = ''; // Cache the preview HTML

    // --- Event Listeners ---
    generateBtn.addEventListener('click', generateAndPreviewSignature);
    copyGmailBtn.addEventListener('click', () => copyRenderedHtml('Web')); // Use Web template
    copyOutlookBtn.addEventListener('click', () => copyRenderedHtml('Outlook'));
    copyAppleMailBtn.addEventListener('click', () => copyRenderedHtml('AppleMail')); // Use specific Apple template
    // copyRawHtmlBtn listener removed
    if (phoneInput) { phoneInput.addEventListener('input', () => { phoneInput.value = phoneInput.value.replace(/[^0-9\+\-\s\(\)xX]/g, ''); }); }

    // --- Main Function to Generate and Preview ---
    function generateAndPreviewSignature() {
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

        currentEmployeeData = {
            fullName: displayFullName,
            jobTitle: displayJobTitle,
            phone: phone,
            email: fullEmail,
            logoHtml: companyLogoUrl ? `<img src="${companyLogoUrl}" alt="Company Logo" width="${companyLogoWidth}" style="${logoStyle}">` : ''
        };

        try {
            const templateConfig = getTemplateDataAndStyles(currentEmployeeData);
            // Generate the Web version for the visual preview
            previewHtmlCache = getSignatureTemplateWeb(templateConfig);

            signaturePreview.innerHTML = previewHtmlCache;
            // signatureHtml value removed
            if (outputContainer) outputContainer.style.display = 'block';
            if (instructionsContainer) instructionsContainer.style.display = 'block';
        } catch (error) {
             console.error("Error during signature preview generation:", error);
             alert("An error occurred while generating the signature preview.");
        }
    } // End generateAndPreviewSignature

    // --- Copy Function (Handles different client types) ---
    function copyRenderedHtml(clientType) {
        clearCopyStatus();
        if (!currentEmployeeData) {
            alert("Please generate the signature first.");
            return;
        }

        let htmlToRender = '';
        const templateConfig = getTemplateDataAndStyles(currentEmployeeData);

        try {
            // Generate the correct HTML for the target client
            if (clientType === 'Outlook') {
                htmlToRender = getSignatureTemplateOutlook(templateConfig);
            } else if (clientType === 'AppleMail') {
                htmlToRender = getSignatureTemplateAppleMail(templateConfig);
            } else { // Default to Web/Gmail template
                htmlToRender = getSignatureTemplateWeb(templateConfig);
            }

            // Temporarily render the specific HTML in the preview div
            // Store original preview content
            const originalPreviewHtml = signaturePreview.innerHTML;
            signaturePreview.innerHTML = htmlToRender;

            // Select the contents of the preview div
            const range = document.createRange();
            range.selectNodeContents(signaturePreview);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);

            // Execute the copy command
            let successful = false;
            try { successful = document.execCommand('copy'); } catch(err) { console.error('copy command failed:', err); }

            // Restore the original preview HTML
            signaturePreview.innerHTML = originalPreviewHtml;

            // Deselect and provide feedback
            selection.removeAllRanges();
            let clientName = clientType; // Default
            if (clientType === 'Web') clientName = 'Gmail/Web';
            else if (clientType === 'AppleMail') clientName = 'Apple Mail';

            setCopyStatus(successful ? `Signature for ${clientName} copied!` : `Failed to copy signature for ${clientName}. Try manual selection.`, successful);

        } catch (err) {
            console.error(`Error copying signature for ${clientType}: `, err);
            // Restore preview even on error
            if (previewHtmlCache) signaturePreview.innerHTML = previewHtmlCache;
            setCopyStatus(`Error copying signature for ${clientType}. Try manual selection.`, false);
        }
    } // End copyRenderedHtml


    // --- Status Update Functions ---
    function setCopyStatus(message, success) { copyStatus.textContent = message; copyStatus.className = `copy-status ${success ? 'success' : 'error'}`; setTimeout(clearCopyStatus, 5000); }
    function clearCopyStatus() { copyStatus.textContent = ''; copyStatus.className = 'copy-status'; }

}); // End DOMContentLoaded

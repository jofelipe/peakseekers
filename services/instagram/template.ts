export default function getInstagramTemplate(title: string, username: string, imageUrl: string, mountainName: string, mountainElevation: string) {
    let usernameHtml;

    if(username === '') {
        usernameHtml = ''
    } else {
        usernameHtml = `<div class="profile-url"><svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M29.5607 7.30583C32.6352 4.23139 37.6198 4.23139 40.6942 7.30583C43.7687 10.3803 43.7687 15.3649 40.6942 18.4393L33.4394 25.6942C30.365 28.7686 25.3803 28.7686 22.3059 25.6942C22.0799 25.4682 21.8709 25.2323 21.6787 24.9882C21.1663 24.3373 20.2232 24.2249 19.5723 24.7374C18.9213 25.2498 18.809 26.1928 19.3214 26.8438C19.5868 27.1809 19.8745 27.5055 20.1846 27.8155C24.4306 32.0615 31.3147 32.0615 35.5607 27.8155L42.8156 20.5607C47.0616 16.3147 47.0616 9.43051 42.8156 5.18451C38.5695 0.938498 31.6854 0.938498 27.4394 5.18451L21.4393 11.1846C20.8535 11.7704 20.8535 12.7201 21.4393 13.3059C22.0251 13.8917 22.9749 13.8917 23.5606 13.3059L29.5607 7.30583Z" fill="#FEFEFE"/><path d="M14.5607 22.3058C17.6351 19.2314 22.6197 19.2314 25.6942 22.3058C25.9203 22.5319 26.1293 22.7677 26.3214 23.0117C26.8338 23.6626 27.7769 23.7749 28.4278 23.2625C29.0787 22.7501 29.191 21.807 28.6786 21.1561C28.4132 20.8189 28.1254 20.4944 27.8155 20.1845C23.5695 15.9385 16.6853 15.9385 12.4393 20.1845L5.18451 27.4393C0.938498 31.6853 0.938498 38.5695 5.18451 42.8155C9.43051 47.0615 16.3147 47.0615 20.5607 42.8155L26.5607 36.8155C27.1464 36.2297 27.1464 35.28 26.5607 34.6942C25.9749 34.1084 25.0251 34.1084 24.4393 34.6942L18.4393 40.6942C15.3649 43.7686 10.3803 43.7686 7.30583 40.6942C4.23139 37.6197 4.23139 32.6351 7.30583 29.5607L14.5607 22.3058Z" fill="#FEFEFE"/></svg>peakseekers.app/${username}</div>`
    }


    return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"/><title>Instagram</title><link href="https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap" rel="stylesheet"/><style>body{margin: 0;font-family: Roboto, sans-serif;font-weight: 700;color: #FEFEFE;background: #4B4E58;text-align: center;width: 1080px; height: 1920px; display: flex; justify-content: center; align-items: center; margin: 0 auto;}main{overflow: hidden;}.logo{margin: 0 0 80px;}h1{font-size: 72px; line-height: 84px; margin: 0 0 80px; padding: 0 30px}.profile-url{width: 100%; display: flex; align-items: center; font-size: 36px; justify-content: center; margin-bottom: 80px;}.profile-url svg{margin-right: 20px}.image{position: relative;}.image img{max-width: 100%; height: auto;}.image span{background: rgba(254, 254, 254, .9); color: #4B4E58; font-size: 36px;padding: 20px 25px 25px;position: absolute;left: 50px;right: 50px;bottom: 50px;display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}.image span svg{margin-right: 20px; position: relative; top: 5px;}</style></head><body><main><svg class="logo" width="363" height="66" viewBox="0 0 363 66" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M96.1016 41.0597V53.4033H88.9213V18.3696H102.516C105.133 18.3696 107.431 18.8509 109.409 19.8133C111.404 20.7758 112.936 22.1473 114.005 23.9279C115.074 25.6924 115.608 27.7055 115.608 29.9673C115.608 33.4001 114.435 36.111 112.09 38.1001C109.76 40.0732 106.529 41.0597 102.396 41.0597H96.1016ZM96.1016 35.2127H102.516C104.415 35.2127 105.859 34.7636 106.848 33.8653C107.853 32.967 108.356 31.6837 108.356 30.0154C108.356 28.299 107.853 26.9115 106.848 25.8528C105.843 24.7941 104.455 24.2487 102.684 24.2166H96.1016V35.2127Z" fill="#FEFEFE"/><path d="M131.202 53.8845C127.404 53.8845 124.309 52.7135 121.915 50.3715C119.538 48.0295 118.349 44.9096 118.349 41.0116V40.3379C118.349 37.7232 118.852 35.3892 119.857 33.3359C120.862 31.2666 122.282 29.6786 124.117 28.5717C125.968 27.4489 128.075 26.8874 130.436 26.8874C133.978 26.8874 136.763 28.0103 138.789 30.2561C140.832 32.5018 141.853 35.6859 141.853 39.8085V42.6478H125.362C125.585 44.3481 126.256 45.7116 127.373 46.7382C128.505 47.7649 129.934 48.2782 131.657 48.2782C134.322 48.2782 136.404 47.3077 137.904 45.3667L141.302 49.1925C140.265 50.6683 138.861 51.8232 137.09 52.6574C135.319 53.4755 133.356 53.8845 131.202 53.8845ZM130.412 32.5178C129.04 32.5178 127.923 32.983 127.061 33.9134C126.216 34.8438 125.673 36.1752 125.434 37.9076H135.056V37.3542C135.024 35.8143 134.609 34.6272 133.811 33.7931C133.013 32.9429 131.88 32.5178 130.412 32.5178Z" fill="#FEFEFE"/><path d="M160.319 53.4033C160 52.7777 159.768 51.9997 159.625 51.0693C157.949 52.9461 155.771 53.8845 153.091 53.8845C150.554 53.8845 148.447 53.1466 146.772 51.6709C145.112 50.1951 144.283 48.3343 144.283 46.0886C144.283 43.3295 145.296 41.2121 147.322 39.7363C149.365 38.2605 152.309 37.5146 156.154 37.4986H159.338V36.0068C159.338 34.8037 159.026 33.8412 158.404 33.1194C157.798 32.3975 156.832 32.0366 155.508 32.0366C154.343 32.0366 153.426 32.3173 152.756 32.8788C152.101 33.4402 151.774 34.2102 151.774 35.1887H144.857C144.857 33.6808 145.32 32.2852 146.245 31.002C147.171 29.7187 148.479 28.7161 150.171 27.9943C151.862 27.2564 153.761 26.8874 155.867 26.8874C159.058 26.8874 161.587 27.6975 163.454 29.3176C165.337 30.9218 166.279 33.1835 166.279 36.103V47.3879C166.294 49.8582 166.638 51.727 167.308 52.9942V53.4033H160.319ZM154.599 48.5669C155.62 48.5669 156.561 48.3423 157.423 47.8932C158.284 47.428 158.923 46.8104 159.338 46.0404V41.565H156.753C153.29 41.565 151.447 42.7681 151.224 45.1742L151.2 45.5833C151.2 46.4495 151.503 47.1633 152.109 47.7248C152.716 48.2862 153.545 48.5669 154.599 48.5669Z" fill="#FEFEFE"/><path d="M180.508 42.9606L178.019 45.463V53.4033H171.102V16.4447H178.019V36.9211L179.359 35.1887L185.989 27.3687H194.294L184.936 38.2204L195.108 53.4033H187.162L180.508 42.9606Z" fill="#FEFEFE"/><path d="M210.822 46.2089C210.822 45.3587 210.399 44.693 209.553 44.2118C208.723 43.7145 207.383 43.2734 205.532 42.8884C199.373 41.5891 196.293 38.9583 196.293 34.9962C196.293 32.6863 197.243 30.7613 199.142 29.2214C201.056 27.6654 203.553 26.8874 206.633 26.8874C209.92 26.8874 212.545 27.6654 214.508 29.2214C216.486 30.7774 217.475 32.7986 217.475 35.2849H210.558C210.558 34.2904 210.239 33.4723 209.601 32.8306C208.963 32.173 207.965 31.8441 206.609 31.8441C205.444 31.8441 204.543 32.1088 203.905 32.6381C203.266 33.1675 202.947 33.8412 202.947 34.6593C202.947 35.4293 203.306 36.0549 204.024 36.5361C204.758 37.0013 205.987 37.4104 207.71 37.7633C209.433 38.1001 210.885 38.4851 212.066 38.9182C215.72 40.2657 217.547 42.5996 217.547 45.9201C217.547 48.2942 216.534 50.2191 214.508 51.6949C212.481 53.1547 209.864 53.8845 206.657 53.8845C204.487 53.8845 202.556 53.4995 200.865 52.7296C199.189 51.9436 197.873 50.8768 196.916 49.5294C195.958 48.1659 195.48 46.6981 195.48 45.1261H202.038C202.101 46.3613 202.556 47.3077 203.402 47.9654C204.248 48.6231 205.38 48.9519 206.801 48.9519C208.125 48.9519 209.122 48.7033 209.792 48.206C210.479 47.6927 210.822 47.027 210.822 46.2089Z" fill="#FEFEFE"/><path d="M233.452 53.8845C229.655 53.8845 226.559 52.7135 224.166 50.3715C221.788 48.0295 220.599 44.9096 220.599 41.0116V40.3379C220.599 37.7232 221.102 35.3892 222.107 33.3359C223.112 31.2666 224.533 29.6786 226.368 28.5717C228.218 27.4489 230.325 26.8874 232.686 26.8874C236.229 26.8874 239.013 28.0103 241.039 30.2561C243.082 32.5018 244.103 35.6859 244.103 39.8085V42.6478H227.612C227.836 44.3481 228.506 45.7116 229.623 46.7382C230.756 47.7649 232.184 48.2782 233.907 48.2782C236.572 48.2782 238.654 47.3077 240.154 45.3667L243.553 49.1925C242.515 50.6683 241.111 51.8232 239.34 52.6574C237.569 53.4755 235.606 53.8845 233.452 53.8845ZM232.662 32.5178C231.29 32.5178 230.173 32.983 229.311 33.9134C228.466 34.8438 227.923 36.1752 227.684 37.9076H237.306V37.3542C237.274 35.8143 236.859 34.6272 236.061 33.7931C235.263 32.9429 234.13 32.5178 232.662 32.5178Z" fill="#FEFEFE"/><path d="M259.481 53.8845C255.684 53.8845 252.588 52.7135 250.195 50.3715C247.817 48.0295 246.629 44.9096 246.629 41.0116V40.3379C246.629 37.7232 247.131 35.3892 248.136 33.3359C249.142 31.2666 250.562 29.6786 252.397 28.5717C254.248 27.4489 256.354 26.8874 258.715 26.8874C262.258 26.8874 265.042 28.0103 267.069 30.2561C269.111 32.5018 270.132 35.6859 270.132 39.8085V42.6478H253.641C253.865 44.3481 254.535 45.7116 255.652 46.7382C256.785 47.7649 258.213 48.2782 259.936 48.2782C262.601 48.2782 264.683 47.3077 266.183 45.3667L269.582 49.1925C268.545 50.6683 267.14 51.8232 265.369 52.6574C263.598 53.4755 261.636 53.8845 259.481 53.8845ZM258.692 32.5178C257.319 32.5178 256.202 32.983 255.341 33.9134C254.495 34.8438 253.953 36.1752 253.713 37.9076H263.335V37.3542C263.303 35.8143 262.888 34.6272 262.09 33.7931C261.292 32.9429 260.16 32.5178 258.692 32.5178Z" fill="#FEFEFE"/><path d="M282.998 42.9606L280.508 45.463V53.4033H273.591V16.4447H280.508V36.9211L281.849 35.1887L288.479 27.3687H296.784L287.425 38.2204L297.598 53.4033H289.651L282.998 42.9606Z" fill="#FEFEFE"/><path d="M310.726 53.8845C306.929 53.8845 303.833 52.7135 301.44 50.3715C299.062 48.0295 297.873 44.9096 297.873 41.0116V40.3379C297.873 37.7232 298.376 35.3892 299.381 33.3359C300.386 31.2666 301.807 29.6786 303.641 28.5717C305.492 27.4489 307.599 26.8874 309.96 26.8874C313.503 26.8874 316.287 28.0103 318.313 30.2561C320.356 32.5018 321.377 35.6859 321.377 39.8085V42.6478H304.886C305.109 44.3481 305.78 45.7116 306.897 46.7382C308.029 47.7649 309.458 48.2782 311.181 48.2782C313.846 48.2782 315.928 47.3077 317.428 45.3667L320.826 49.1925C319.789 50.6683 318.385 51.8232 316.614 52.6574C314.843 53.4755 312.88 53.8845 310.726 53.8845ZM309.936 32.5178C308.564 32.5178 307.447 32.983 306.585 33.9134C305.74 34.8438 305.197 36.1752 304.958 37.9076H314.58V37.3542C314.548 35.8143 314.133 34.6272 313.335 33.7931C312.537 32.9429 311.404 32.5178 309.936 32.5178Z" fill="#FEFEFE"/><path d="M339.388 33.8893C338.447 33.761 337.617 33.6969 336.899 33.6969C334.282 33.6969 332.567 34.5871 331.753 36.3677V53.4033H324.836V27.3687H331.37L331.562 30.4726C332.95 28.0825 334.873 26.8874 337.33 26.8874C338.096 26.8874 338.814 26.9917 339.484 27.2002L339.388 33.8893Z" fill="#FEFEFE"/><path d="M356.274 46.2089C356.274 45.3587 355.852 44.693 355.006 44.2118C354.176 43.7145 352.836 43.2734 350.985 42.8884C344.826 41.5891 341.746 38.9583 341.746 34.9962C341.746 32.6863 342.696 30.7613 344.594 29.2214C346.509 27.6654 349.006 26.8874 352.086 26.8874C355.373 26.8874 357.998 27.6654 359.96 29.2214C361.939 30.7774 362.928 32.7986 362.928 35.2849H356.011C356.011 34.2904 355.692 33.4723 355.054 32.8306C354.415 32.173 353.418 31.8441 352.062 31.8441C350.897 31.8441 349.996 32.1088 349.357 32.6381C348.719 33.1675 348.4 33.8412 348.4 34.6593C348.4 35.4293 348.759 36.0549 349.477 36.5361C350.211 37.0013 351.44 37.4104 353.163 37.7633C354.886 38.1001 356.338 38.4851 357.519 38.9182C361.173 40.2657 363 42.5996 363 45.9201C363 48.2942 361.987 50.2191 359.96 51.6949C357.934 53.1547 355.317 53.8845 352.11 53.8845C349.94 53.8845 348.009 53.4995 346.318 52.7296C344.642 51.9436 343.326 50.8768 342.368 49.5294C341.411 48.1659 340.932 46.6981 340.932 45.1261H347.49C347.554 46.3613 348.009 47.3077 348.855 47.9654C349.7 48.6231 350.833 48.9519 352.253 48.9519C353.578 48.9519 354.575 48.7033 355.245 48.206C355.931 47.6927 356.274 47.027 356.274 46.2089Z" fill="#FEFEFE"/><path d="M33.1097 16.675L54.0725 52.9837H12.1469L33.1097 16.675Z" fill="#FEFEFE"/><path d="M29.3443 21.5162L44.2512 47.3357H14.4375L29.3443 21.5162Z" fill="#4B4E58"/><path d="M5.27623 61.5865L37.4129 5.92419L69.5496 61.5865H5.27623Z" stroke="#FEFEFE" stroke-width="7"/></svg><h1>${title}</h1>${usernameHtml}<div class="image"><img src="https://firebasestorage.googleapis.com/v0/b/peakseekers-b6502.appspot.com/o/${imageUrl}?alt=media" alt=""/><span><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 22.5C22.3012 22.5 24.1667 20.6345 24.1667 18.3333C24.1667 16.0321 22.3012 14.1666 20 14.1666C17.6988 14.1666 15.8333 16.0321 15.8333 18.3333C15.8333 20.6345 17.6988 22.5 20 22.5Z" fill="#4B4E58"/><path fill-rule="evenodd" clip-rule="evenodd" d="M31.7851 5.71487C25.2764 -0.793872 14.7236 -0.793872 8.21488 5.71487C1.70614 12.2236 1.70614 22.7764 8.21488 29.2851L8.26105 29.3311L17.2204 38.2905C18.7556 39.8257 21.2447 39.8257 22.7799 38.2905L31.7852 29.2851C38.2938 22.7764 38.2938 12.2236 31.7851 5.71487ZM9.98265 7.48263C15.5151 1.95021 24.4849 1.95021 30.0173 7.48263C35.5497 13.015 35.5498 21.9849 30.0174 27.5174L21.0121 36.5227C20.4532 37.0816 19.5471 37.0816 18.9882 36.5227L10.0254 27.5599L10.022 27.5566L9.98265 27.5173C4.45022 21.9849 4.45022 13.0151 9.98265 7.48263Z" fill="#4B4E58"/></svg>${mountainName} - ${mountainElevation}</span></div></main></body></html>`;
}
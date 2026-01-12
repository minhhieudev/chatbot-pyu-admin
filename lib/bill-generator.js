import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const COMPANY_INFO = {
  name: "SAIGON SPEED EXPRESS",
  address: "123 Đường ABC, Quận X, TP. HCM",
  hotline: "028 38 444 990 - 0822 248 494",
  website: "Saigonspeed.vn",
};

/**
 * Generates an Order Bill PDF with a clean solid blue theme matching the logo.
 */
export const generateOrderBillPDF = async (order, isBlank = false) => {
  const data = isBlank ? {} : order;
  if (!isBlank && !order) return;

  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.left = "-9999px";
  iframe.style.top = "0";
  iframe.style.width = "1300px";
  iframe.style.height = "3000px";
  iframe.style.border = "none";
  document.body.appendChild(iframe);

  const getVal = (path, fallback = "") => {
    if (isBlank) return fallback;
    return (
      path
        .split(".")
        .reduce(
          (obj, key) =>
            obj && obj[key] !== undefined && obj[key] !== null
              ? obj[key]
              : undefined,
          data
        ) ?? fallback
    );
  };

  const checkIcon = (checked) => (checked && !isBlank ? "☑" : "☐");

  // Dynamic values
  const currentHotline = getVal("settings.hotline", COMPANY_INFO.hotline);
  const currentWebsite = getVal("settings.website", COMPANY_INFO.website);

  // LOGO BLUE COLOR
  const logoBlue = "#003B95";

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Roboto+Mono:wght@400;700&display=swap" rel="stylesheet">
      <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"></script>
      <style>
        * { box-sizing: border-box; -webkit-print-color-adjust: exact; margin: 0; padding: 0; }
        body {
          margin: 0;
          padding: 8px;
          background: white;
          width: 1420px;
          font-family: 'Inter', sans-serif;
        }
        .bill-container {
          border: 3px solid ${logoBlue};
          background: #fff;
          position: relative;
          width: 1400px;
          margin: 0 auto;
          overflow: hidden;
        }
        
        /* HEADER */
        .header {
          display: flex;
          padding: 20px 30px;
          border-bottom: 3px solid ${logoBlue};
          height: 190px;
          justify-content: space-between;
          align-items: center;
        }
        
        .header-left {
          width: 300px;
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .logo-box {
          width: 90px; height: 90px;
          display: flex; align-items: center; justify-content: center;
        }
        .logo-box img {
          width: 100%; height: auto; object-fit: contain;
        }
        .logo-text-group { color: ${logoBlue}; line-height: 1; margin-top: -32px; }
        .logo-sse { font-size: 42px; font-weight: 900; letter-spacing: -1px; }
        .logo-exp { font-size: 16px; font-weight: 700; letter-spacing: 3px; margin-top: 6px; }

        .header-center { 
          flex: 1; 
          text-align: center;
          padding: 0 20px;
        }
        .title-vn { 
          font-size: 46px; 
          font-weight: bold; 
          color: ${logoBlue};
          letter-spacing: 2px; 
          line-height: 1.1; 
          margin-bottom: 5px; 
        }
        .title-en { font-size: 20px; font-weight: 700; color: #475569; }
        .hotline-text { 
           font-size: 16px; 
           font-weight: 800; 
           margin-top: 12px; 
           color: #1e293b;
        }

        .header-right { 
          width: 520px;
          display: flex; 
          align-items: center; 
          justify-content: flex-end; 
          gap: 20px;
        }
        .barcode-container { text-align: center; margin-right: 15px; opacity: ${isBlank ? 0 : 1}; }
        #barcode { width: 190px; height: 80px; }
        .awb-text { font-family: 'Roboto Mono', monospace; font-size: 24px; font-weight: 800; display: block; margin-top: -2px; color: #000; }

        .meta-data { display: flex; flex-direction: column; gap: 12px; width: 280px; }
        .meta-row { display: flex; align-items: center; justify-content: flex-end; gap: 12px; }
        .meta-label { text-align: right; line-height: 1.1; font-weight: 700; font-size: 11px; white-space: nowrap; color: #444; }
        .meta-label span { display: block; font-weight: 500; font-size: 9px; font-style: italic; color: #666; }
        .meta-box { 
          border: 2px solid ${logoBlue}; 
          width: 210px; 
          height: 42px; 
          background: #fff; 
          display: flex; 
          align-items: center; 
          padding: 0 12px; 
          font-size: 16px; 
          font-weight: 800; 
          color: #000;
        }

        /* SECTION HEADERS */
        .s-head {
          background: ${logoBlue};
          color: #fff;
          height: 34px;
          display: flex;
          align-items: center;
          font-size: 14px;
          font-weight: 700;
        }
        .s-num {
          background: rgba(0, 0, 0, 0.2);
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          font-weight: 900;
          color: #fff;
          margin-right: 12px;
          border-right: 1px solid rgba(255,255,255,0.1);
        }
        .s-num-inner {
          display: block;
          margin-top: -2px;
        }
        .s-title-text,
        .s-txt {
          flex: 1;
          display: flex;
          align-items: center;
          height: 34px;
          margin-top: -2px;
        }
        .s-en-text { 
          font-weight: 400; 
          font-size: 11px; 
          margin-left: 10px; 
          font-style: italic; 
          opacity: 0.9; 
        }

        /* BODY LAYOUT */
        .row { display: flex; border-bottom: 2px solid ${logoBlue}; }
        .col { width: 50%; border-right: 2px solid ${logoBlue}; }
        .col:last-child { border-right: none; }

        .section-body { padding: 15px 15px; min-height: 130px; }
        .data-field { display: flex; margin-bottom: 12px; align-items: flex-end; }
        .label-cell { width: 145px; font-size: 13px; font-weight: 700; line-height: 1.2; color: #333; }
        .label-cell small { display: block; font-weight: 400; font-size: 10px; font-style: italic; color: #666; }
        .value-cell { 
          flex: 1; 
          border-bottom: 1.5px dotted #aaa; 
          font-weight: 800; 
          font-size: 16px; 
          min-height: 28px; 
          padding-left: 10px; 
          padding-bottom: 5px; 
          display: flex; 
          align-items: flex-end; 
          color: #000;
        }

        .checkbox-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; padding: 15px 15px; }
        .checkbox-item { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; color: #222; }
        .check-box-symbol { font-size: 24px; line-height: 1; font-weight: normal; color: ${logoBlue}; }

        .contents-left { width: 50%; border-right: 2px solid ${logoBlue}; }
        .contents-right { width: 50%; padding: 15px 20px; }

        /* POSTAGE CALC - ADJUSTED WIDTHS */
        .postage-left { width: 55%; border-right: 2px solid ${logoBlue}; } /* Increased slightly to balance row calc */
        .postage-right { width: 45%; padding: 15px 20px; }
        .price-line { display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 8px; color: #333; align-items: flex-end; }
        .price-val { 
          font-weight: 800; 
          border-bottom: 1.5px dotted #aaa; 
          min-width: 100px; 
          text-align: right; 
          color: #000; 
          font-size: 14px;
          letter-spacing: -0.3px;
          padding-bottom: 6px; /* Increased to avoid slicing text */
        }
        
        .total-block {
          margin-top: 15px;
          display: flex;
          width: 100%;
          border: 2px solid ${logoBlue};
          background: #f8faff;
        }

        .total-left {
          width: 34%; /* Increased to accommodate label */
          padding: 8px 10px;
          border-right: 2px solid ${logoBlue};
          font-weight: 800;
          font-size: 13px;
          line-height: 1.2;
          color: ${logoBlue};
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .total-left .total-en { font-size: 10px; font-style: italic; font-weight: 400; }

        .total-right {
          width: 66%;
          padding: 6px 10px;
          font-size: 19px; /* Reduced from 22px to handle large amounts */
          display: flex;
          align-items: center;
          justify-content: flex-end;
          font-weight: 900;
          color: #000;
          letter-spacing: -0.5px;
          overflow: hidden;
          white-space: nowrap;
        }

        .signatures { display: flex; border-top: 2px solid ${logoBlue}; min-height: 170px; }
        .sig-col { flex: 1; border-right: 2px solid ${logoBlue}; text-align: center; padding: 15px; position: relative; }
        .sig-col:last-child { border-right: none; }
        .sig-bottom { position: absolute; bottom: 35px; left: 10%; width: 80%; border-bottom: 1.5px dotted #aaa; font-size: 11px; color: #666; }

        .stamps-row { display: flex; min-height: 110px; border-bottom: 3px solid ${logoBlue}; }
        .stamp-cell { flex: 1; border-right: 2px solid ${logoBlue}; padding: 15px 20px; }
        .stamp-cell:last-child { border-right: none; }
        
        .footer-text { text-align: center; padding: 12px; font-size: 12.5px; font-style: italic; font-weight: 700; color: #444; }

        .vertical-label {
          position: absolute; right: -320px; top: 450px; transform: rotate(90deg);
          font-size: 11px; color: ${logoBlue}; width: 1100px; font-weight: 700;
        }

        .bill-watermark {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-30deg);
          font-size: 120px; font-weight: 900; color: rgba(0, 59, 149, 0.03);
          pointer-events: none; z-index: 0; white-space: nowrap; letter-spacing: 10px;
        }

      </style>
    </head>
    <body id="render-target">
      <div class="vertical-label">Liên 1: Lưu TT Giao Dịch nhận/Copy 1: Center Transactions Development - Liên 2: Lưu TT Giao Dịch phát/Copy 2: Center Transactions Delivery - Liên 3: Lưu Khách Hàng Giao/Copy 3: Customer sender's</div>
      
      <div class="bill-container" id="main-bill">
        <div class="bill-watermark">SAIGON SPEED</div>
        
        <div class="header">
          <div class="header-left">
            <div class="logo-box">
               <img src="/logo-app.png" alt="Logo" />
            </div>
            <div class="logo-text-group">
               <div class="logo-sse">SSE</div>
               <div class="logo-exp">EXPRESS</div>
            </div>
          </div>
          
          <div class="header-center">
            <h1 class="title-vn">PHIẾU GỬI</h1>
            <div class="title-en">BILL OF CONSIGNMENT</div>
            <div class="hotline-text">Hotline: ${currentHotline}</div>
            <div style="font-size: 12px; font-weight: 700; margin-top: 6px; color: ${logoBlue};">Tra cứu vận đơn tại: ${currentWebsite}</div>
          </div>
          
          <div class="header-right">
            <div class="barcode-container">
              <svg id="barcode"></svg>
              <span class="awb-text">${getVal("awb", "")}</span>
            </div>
            <div class="meta-data">
              <div class="meta-row">
                <div class="meta-label">Mã KH /<span>Customer code</span></div>
                <div class="meta-box">${isBlank ? "" : getVal("customerCode") || getVal("customer_id") || "WALK-IN"}</div>
              </div>
              <div class="meta-row">
                <div class="meta-label">TTGD /<span>Transaction center</span></div>
                <div class="meta-box">${isBlank ? "" : getVal("branchCode", "HCM-SSE")}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="row">
          <div class="col">
            <div class="s-head">
              <div class="s-num"><span class="s-num-inner">1</span></div>
              <div class="s-title-text">Thông tin người gửi <span class="s-en-text">/ Information Sender</span></div>
            </div>
            <div class="section-body">
              <div class="data-field"><div class="label-cell">Họ tên người gửi:<small>Sender's name</small></div><div class="value-cell">${getVal("senderContact") || getVal("sender_contact", "")}</div></div>
              <div class="data-field"><div class="label-cell">Địa chỉ:<small>Address</small></div><div class="value-cell">${getVal("senderAddress") || getVal("sender_address", "")}</div></div>
              <div class="data-field"><div class="label-cell">Điện thoại:<small>Phone number</small></div><div class="value-cell">${getVal("senderPhone") || getVal("sender_phone", "")}</div></div>
            </div>
          </div>
          <div class="col">
            <div class="s-head">
              <div class="s-num"><span class="s-num-inner">2</span></div>
              <div class="s-title-text">Thông tin người nhận <span class="s-en-text">/ Information Receiver</span></div>
            </div>
            <div class="section-body">
              <div class="data-field"><div class="label-cell">Họ tên người nhận:<small>Recipient's name</small></div><div class="value-cell">${getVal("receiverContact") || getVal("receiver_contact", "")}</div></div>
              <div class="data-field"><div class="label-cell">Địa chỉ:<small>Address</small></div><div class="value-cell">${getVal("receiverAddress") || getVal("receiver_address", "")}</div></div>
              <div class="data-field"><div class="label-cell">Điện thoại:<small>Phone number</small></div><div class="value-cell">${getVal("receiverPhone") || getVal("receiver_phone", "")}</div></div>
            </div>
          </div>
        </div>
        
        <div class="row">
           <div class="col" style="display:flex;">
              <div class="contents-left">
                 <div class="s-head"><div class="s-num"><span class="s-num-inner">3</span></div><div class="s-title-text">Nội dung <span class="s-en-text">/ Contents</span></div></div>
                 <div class="checkbox-grid">
                    <div class="checkbox-item"><span class="check-box-symbol">${checkIcon(getVal("serviceCode") === "DOC" || getVal("service_code") === "DOC")}</span> Chứng từ / Document</div>
                    <div class="checkbox-item"><span class="check-box-symbol">${checkIcon(getVal("serviceCode") === "PKG" || getVal("service_code") === "PKG")}</span> Hàng hóa / Packages</div>
                    <div class="checkbox-item"><span class="check-box-symbol">${checkIcon(false)}</span> HGTC, HST</div>
                    <div class="checkbox-item"><span class="check-box-symbol">${checkIcon(false)}</span> Hàng lạnh, Vắc xin</div>
                 </div>
              </div>
              <div class="contents-right">
                 <div style="font-size:13px; font-weight:700; margin-bottom:8px; color: #555;">Nội dung: <span style="font-weight:400; font-style:italic; font-size:10px;">/ Contents</span></div>
                 <div style="font-size:15px; font-weight:500; border-bottom:1.5px solid #aaa; min-height:45px; display:flex; align-items:flex-end; padding-bottom: 8px; line-height: 1.3;">${getVal("masterProductName") || getVal("content", "")}</div>
              </div>
           </div>
           <div class="col">
              <div class="s-head"><div class="s-num"><span class="s-num-inner">5</span></div><div class="s-title-text">Hình thức thanh toán <span class="s-en-text">/ Payment method</span></div></div>
              <div class="checkbox-grid" style="grid-template-columns: 1fr;">
                 <div class="checkbox-item"><span class="check-box-symbol">${checkIcon(false)}</span> Tiền mặt / <span style="font-weight:400; font-style:italic; color:#666;">Cash</span></div>
                 <div class="checkbox-item"><span class="check-box-symbol">${checkIcon(false)}</span> Cuối tháng / <span style="font-weight:400; font-style:italic; color:#666;">End of month</span></div>
                 <div class="checkbox-item"><span class="check-box-symbol">${checkIcon(false)}</span> Người nhận thanh toán / <span style="font-weight:400; font-style:italic; color:#666;">Recipient pay</span></div>
              </div>
           </div>
        </div>

        <div class="row">
          <div class="postage-left">
            <div class="s-head"><div class="s-num"><span class="s-num-inner">4</span></div><div class="s-title-text">Dịch vụ và cước phí <span class="s-en-text">/ Services & Postage</span></div></div>
            <div style="display:flex;">
               <div class="checkbox-grid" style="width:48%; border-right:2px solid ${logoBlue};">
                  <div class="checkbox-item"><span class="check-box-symbol">${checkIcon(false)}</span> CPN / Express</div>
                  <div class="checkbox-item"><span class="check-box-symbol">${checkIcon(false)}</span> 24h-36h</div>
                  <div class="checkbox-item"><span class="check-box-symbol">${checkIcon(false)}</span> PTN / Delivery</div>
                  <div class="checkbox-item"><span class="check-box-symbol">${checkIcon(false)}</span> Hỏa tốc / Fast</div>
                  <div class="checkbox-item"><span class="check-box-symbol">${checkIcon(false)}</span> Tiết kiệm / Economy</div>
                  <div class="checkbox-item"><span class="check-box-symbol">${checkIcon(false)}</span> Đường bộ / Road</div>
                  <div class="checkbox-item"><span class="check-box-symbol">${checkIcon(false)}</span> CPN Quốc tế</div>
                  <div class="checkbox-item"><span class="check-box-symbol">${checkIcon(false)}</span> Thu hộ / COD</div>
               </div>
               <div class="postage-right" style="width: 52%;">
                  <div class="price-line"><span>Số kiện:</span> <span class="price-val">${isBlank ? "" : getVal("totalPackages", 1)}</span></div>
                  <div class="price-line"><span>Trọng lượng:</span> <span class="price-val">${isBlank ? "" : getVal("totalWeight", 0) + " kg"}</span></div>
                  <div class="price-line"><span>Quy đổi:</span> <span class="price-val">${isBlank ? "" : getVal("convertedWeight", 0) + " kg"}</span></div>
                  <div class="price-line" style="margin-top:10px;"><span>Cước chính:</span> <span class="price-val">${isBlank ? "" : (Number(getVal("sellingPrice") || getVal("total_price", 0)) * 0.9).toLocaleString() + " đ"}</span></div>
                  <div class="price-line"><span>Phụ phí:</span> <span class="price-val">${isBlank ? "" : (Number(getVal("sellingPrice") || getVal("total_price", 0)) * 0.1).toLocaleString() + " đ"}</span></div>
                  <div class="total-block">
                    <div class="total-left">
                      Tổng cộng:<br/>
                      <span class="total-en">Total</span>
                    </div>
                    <div class="total-right">
                      ${isBlank ? "" : Number(getVal("sellingPrice") || getVal("total_price", 0)).toLocaleString() + " đ"}
                    </div>
                  </div>
               </div>
            </div>
          </div>
          <div class="col" style="display:flex; flex-direction:column;">
             <div style="border-bottom:2px solid ${logoBlue};">
                <div class="s-head"><div class="s-num"><span class="s-num-inner">6</span></div><div class="s-txt">Trường hợp không phát được <span class="s-en-text">/ Undeliverable</span></div></div>
                <div class="checkbox-grid" style="grid-template-columns: repeat(3, 1fr);">
                  <div class="checkbox-item"><span class="check-box-symbol">${checkIcon(false)}</span> Chuyển tiếp</div>
                  <div class="checkbox-item"><span class="check-box-symbol">${checkIcon(false)}</span> Chuyển hoàn</div>
                  <div class="checkbox-item"><span class="check-box-symbol">${checkIcon(false)}</span> Hủy</div>
                </div>
             </div>
             <div style="flex:1;">
                <div class="s-head"><div class="s-num"><span class="s-num-inner">7</span></div><div class="s-txt">Chữ ký người gửi, người nhận <span class="s-en-text">/ Signature Sender, Receiver</span></div></div>
                <div class="signatures">
                   <div class="sig-col">
                     <div style="font-size:14px; font-weight:800;">Người gửi / Sender's</div>
                     <div style="font-size:11px; font-style:italic; color:#666;">(Ký, ghi rõ họ tên/Sign, full name)</div>
                     <div class="sig-bottom">..........h........./........./ 202...</div>
                   </div>
                   <div class="sig-col">
                     <div style="font-size:14px; font-weight:800;">Người nhận / Receiver</div>
                     <div style="font-size:11px; font-style:italic; color:#666;">(Ký, ghi rõ họ tên/Sign, full name)</div>
                     <div class="sig-bottom">..........h........./........./ 202...</div>
                   </div>
                </div>
             </div>
          </div>
        </div>

        <div class="stamps-row">
           <div class="stamp-cell"><div style="font-size:14px; font-weight:800;">Dấu/ Nhân Viên Nhận:</div><div style="font-size:12px; font-style:italic; color:#666;">Stamp/ Agent of accept</div></div>
           <div class="stamp-cell"><div style="font-size:14px; font-weight:800;">Dấu/ Nhân Viên Phát:</div><div style="font-size:12px; font-style:italic; color:#666;">Stamp/ Agent of delivery</div></div>
        </div>
        
        <div class="footer-text">
           Khi ký gửi là đồng nghĩa chấp nhận các khoản tại mặt sau phiếu gửi và cam đoan bưu gửi này không chứa những mặt hàng nguy hiểm cấm gửi
        </div>
      </div>

      <script>
        try {
          if (!${isBlank}) {
            JsBarcode("#barcode", "${getVal("awb", "80290925")}", {
              format: "CODE128", width: 2.1, height: 75, displayValue: false, margin: 0
            });
          }
        } catch(e) {}
      </script>
    </body>
    </html>
  `;

  const doc = iframe.contentWindow.document;
  doc.open();
  doc.write(htmlContent);
  doc.close();

  await new Promise((resolve) => {
    iframe.onload = () => setTimeout(resolve, 2000);
  });

  try {
    const container = iframe.contentWindow.document.getElementById("main-bill");

    const canvas = await html2canvas(container, {
      scale: 3,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
    const displayWidth = imgWidth * ratio;
    const displayHeight = imgHeight * ratio;

    const marginX = (pageWidth - displayWidth) / 2;
    const marginY = (pageHeight - displayHeight) / 2;

    pdf.addImage(imgData, "PNG", marginX, marginY, displayWidth, displayHeight);
    pdf.save(isBlank ? "SAIGON_SPEED_Empty_Form.pdf" : `SAIGON_SPEED_Bill_${order.awb || "order"}.pdf`);
  } catch (error) {
    console.error("PDF Final Generation failed:", error);
  } finally {
    document.body.removeChild(iframe);
  }
};

export const generateBlankBillPDF = () => generateOrderBillPDF({}, true);



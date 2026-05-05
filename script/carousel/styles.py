from __future__ import annotations


def build_css() -> str:
    return """
    :root{
      --page-w:1080px;
      --page-h:1350px;
      --m:100px;
      --safe-top:86px;
      --safe-bottom:120px;
      --g:18px;
      --bg-from:#ffffff;
      --bg-to:#e0e7ff;
      --accent:oklch(0.585 0.233 277.117);
      --accent-soft:#5d64b3;
      --gray-1:#E6E8EB;
      --gray-2:#6B7280;
      --gray-3:#9CA3AF;
      --text:#0B0F14;
      --panel:rgba(255,255,255,.58);
      --surface:#f8fafc;
      --font-primary: Aspekta, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      --font-display: 'Cabinet Grotesk', Aspekta, sans-serif;
    }
    *{box-sizing:border-box}
    html,body{margin:0;padding:0;background:#f3f4f6;font-family:var(--font-primary);color:var(--text)}
    body{display:flex;justify-content:center;align-items:flex-start;padding:18px 0}
    .page{
      width:var(--page-w);height:var(--page-h);position:relative;overflow:hidden;
      padding:var(--safe-top);padding-bottom:var(--safe-bottom);
      background-image:linear-gradient(to top right,var(--bg-from),var(--bg-to));
      box-shadow:0 18px 55px rgba(0,0,0,.18);
      margin: 0 auto;
      padding-top:100px;
    }
    .content-frame{
      border: 8px solid #000;
      padding: 40px;
      padding-top: 50px;
      width: 100%;
      display:flex;
      flex-direction:column;
      justify-content:flex-start;
      height:850px;
      width:850px;
      position:relative;
    }
    .page::before{
      content:"";position:absolute;inset:0;pointer-events:none;opacity:.026;
      background-image:radial-gradient(rgba(0,0,0,.88) 1px, transparent 1px);background-size:10px 10px;
    }
    .grid{position:relative;z-index:1;display:grid;grid-template-columns:repeat(12,1fr);column-gap:var(--g);align-content:start;height:100%}
    .logo{grid-column:1/span 5;font-size:22px;font-weight:700;letter-spacing:-.03em;font-family:var(--font-display)}
    .logo .dot{color:var(--accent);font-size:30px;}
    .series{grid-column:9/span 4;justify-self:end;font-size:11px;letter-spacing:.14em;color:var(--gray-2);font-weight:700;text-transform:uppercase;text-align:right}
    .title{grid-column:1/span 12;margin-top:44px;font-size:40px;line-height:.96;font-weight:700;letter-spacing:-.035em;font-family:var(--font-display)}
    .title .line{display:block}
    .subtitle{grid-column:1/span 12;margin-top:18px;font-size:35px;line-height:1.16;color:var(--gray-2)}
    .meta{grid-column:1/span 12;margin-top:20px;font-size:25px;color:var(--gray-2);line-height:1.42}
    .section-kicker{grid-column:1/span 5;margin-top:22px;font-size:18px;letter-spacing:.14em;color:var(--gray-2);font-weight:700;text-transform:uppercase}
    .section-title{grid-column:1/span 12;margin-top:40px;font-size:48px;line-height:1.02;font-weight:700;letter-spacing:-.03em;font-family:var(--font-display)}
    .section-title-concept{font-size:56px}
    .section-title-now{font-size:56px}
    .copy{grid-column:1/span 6;margin-top:18px;font-size:24px;line-height:1.5;font-weight:600;color:var(--gray-2);}
    .copy strong{color:var(--accent)}
    .card-list{grid-column:8/span 5;margin-top:18px}
    .copy.with-inline-image{margin-bottom:22px}
    .inline-copy-image{grid-column:1/span 6;height:320px;border-radius:14px;overflow:hidden;border:1px solid rgba(11,15,20,.08);background:#fff}
    .inline-copy-image img{width:100%;height:100%;object-fit:cover}
    .card{display:grid;grid-template-columns:56px 1fr;gap:12px;padding:0 0 22px;margin:0 0 22px;border-bottom:1px solid var(--gray-1)}
    .num{font-size:42px;line-height:.9;font-weight:700;color:var(--accent);font-family:var(--font-display)}
    .card h3{margin:3px 0 8px;font-size:22px;line-height:1.05;letter-spacing:-.02em}
    .card p{margin:0;font-size:15px;line-height:1.4;color:var(--gray-2)}
    .timeline{grid-column:1/span 12;margin-top:15px;display:grid;grid-template-columns:repeat(var(--timeline-cols,3),1fr);column-gap:var(--g)}
    .time-block{padding-top:15px;border-top:2px solid var(--accent)}
    .time-date{font-size:14px;font-weight:700;color:var(--accent);margin-bottom:16px}
    .time-title{font-size:24px;font-weight:700;line-height:1.04;margin-bottom:12px}
    .time-body{font-size:18px;line-height:1.42;color:var(--gray-2)}
    .compare-wrap{grid-column:1/span 12;margin-top:24px;display:grid;border-top:1px solid var(--gray-1);border-left:1px solid var(--gray-1);background:rgba(255,255,255,.45)}
    .cell{min-height:90px;padding:14px;border-right:1px solid var(--gray-1);border-bottom:1px solid var(--gray-1);display:flex;flex-direction:column;justify-content:flex-start}
    .cell.head{min-height:96px;background:rgba(255,255,255,.62)}
    .cell .label{font-size:18px;letter-spacing:.14em;color:var(--gray-2);font-weight:700;text-transform:uppercase;margin-bottom:8px}
    .cell .main{font-size:20px;line-height:1.1;font-weight:700;letter-spacing:-.02em;color:var(--text)}
    .cell .muted{margin-top:8px;font-size:14px;line-height:1.35;color:var(--gray-2)}
    .visual-story-wrap{grid-column:1/span 12;margin-top:14px;display:grid;grid-template-columns:1fr;gap:0;}
    .visual-story-image{width:800px;height:500px;overflow:hidden;position:relative;display:flex;}
    .visual-story-image img{width:min(100%,750px);height:min(100%,450px);object-fit:contain;object-position:center center}
    .visual-story-paragraph{position:absolute;left:40px;right:18px;bottom:30px;margin:0;font-size:22px;line-height:1.3;}
    .definitions-wrap{grid-column:1/span 12;margin-top:16px;display:grid;grid-template-columns:1fr;gap:10px}
    .definitions-intro{font-size:30px;color:var(--gray-2);font-weight:500;line-height:1;margin-bottom:8px;max-width:860px}
    .def-item{display:grid;grid-template-columns:3fr 9fr;gap:16px;padding:14px 0;border-bottom:1px solid var(--gray-1)}
    .def-term{font-size:22px;font-weight:700;letter-spacing:-.01em;color:var(--text)}
    .def-body{font-size:20px;font-weight:500;line-height:1.4;color:var(--gray-2)}
    .bullets{grid-column:1/span 6;margin-top:24px;font-size:20px;line-height:1.35}
    .bullets ul{margin:0;padding-left:0;list-style:none}
    .bullets li{margin:0 0 22px;padding-bottom:18px;border-bottom:1px solid var(--gray-1)}
    .bullets li::before{content:"— ";color:var(--accent);font-weight:700}
    .right-note{grid-column:8/span 5;margin-top:24px;font-size:15px;line-height:1.45;color:var(--gray-2);padding-top:18px;border-top:1px solid var(--gray-1)}
    .matrix{grid-column:1/span 12;margin-top:30px;display:grid;grid-template-columns:repeat(2,1fr);gap:14px}
    .box{background:var(--panel);border:1px solid rgba(11,15,20,.08);padding:22px;min-height:176px;backdrop-filter: blur(2px)}
    .box .small{font-size:11px;letter-spacing:.14em;color:var(--gray-2);font-weight:700;text-transform:uppercase;margin-bottom:14px}
    .box .big{font-size:28px;line-height:1.06;font-weight:700;letter-spacing:-.02em;margin-bottom:10px}
    .box p{margin:0;font-size:17px;line-height:1.45;color:var(--gray-2)}
    .radar-wrap{grid-column:1/span 12;margin-top:12px;display:grid;grid-template-columns:5fr 7fr;gap:18px;align-items:start}
    .radar-text{font-size:22px;line-height:1.25}
    .radar-text strong{color:var(--accent)}
    .bodycopy{font-size:20px;line-height:1.45;color:var(--gray-2);font-weight:700}
    .dual-client{margin-top:22px;display:grid;grid-template-columns:1fr 1fr;gap:14px}
    .dual-client .client-box{background:var(--surface);border:1px solid var(--gray-1);padding:12px;border-radius:10px}
    .dual-client .name{font-size:12px;font-weight:700;color:var(--accent);text-transform:uppercase;letter-spacing:.08em}
    .dual-client ul{margin:8px 0 0;padding-left:16px}
    .dual-client li{font-size:13px;line-height:1.35;color:var(--gray-2);margin-bottom:6px}
    .simple-legend{margin-top:10px;border-top:1px solid var(--gray-1);padding-top:10px;display:flex;gap:18px;flex-wrap:wrap}
    .simple-legend-item{font-size:13px;color:var(--gray-2);display:flex;align-items:center;gap:8px}
    .simple-legend-item .dot{display:inline-block;width:10px;height:10px;border-radius:50%}
    .radar-quarter{width:100%;height:100%;min-height:450px}
    .legend{margin-top:10px;border-top:1px solid var(--gray-1);padding-top:10px;display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
    .card-desc{font-size:20px;color:var(--gray-2);font-weight:600}
    .legend .item{font-size:12px;color:var(--gray-2)}
    .legend .name{display:block;color:var(--text);font-weight:700;margin-bottom:3px}
    .image-wrap{position:absolute;right:74px;top:130px;width:270px;height:190px;border-radius:14px;overflow:hidden;border:1px solid rgba(11,15,20,.08);background:#fff;z-index:0}
    .image-wrap img{width:100%;height:100%;object-fit:cover}
    .footer-line{position:absolute;left:var(--m);right:var(--m);bottom:calc(var(--safe-bottom) - 10px);border-top:1px solid var(--gray-1);z-index:1}
    .footer{position:absolute;left:var(--m);right:var(--m);bottom:calc(var(--safe-bottom) - 42px);z-index:1;display:grid;grid-template-columns:repeat(12,1fr);column-gap:var(--g);font-size:12px;color:var(--gray-3)}
    .slide-1 .footer-line,.slide-1 .footer{display:none}
    .slide-1 .title{margin-top:36px;font-size:64px;line-height:.98}
    .slide-1 .subtitle{margin-top:14px;font-size:35px;line-height:1.18}
    .slide-1 .meta{margin-top:14px;font-size:20px}

    .slide-2 .section-title{margin-top:40px;font-size:52px}
    .slide-2 .copy{margin-top:30px;font-size:27px;line-height:1}
    .slide-2 .inline-copy-image{height:250px}
    .slide-2 .card-desc{font-size:20px;color:var(--gray-2);font-weight:600}
    .slide-2 .card-list{margin-top:30px;max-height:620px;overflow:hidden}
    .slide-2 .card{padding:0 0 14px;margin:0 0 14px}
    .slide-2 .card h3{font-size:20px}
    .slide-2 .card p{font-size:14px;line-height:1.35}

    
    .slide-3 .section-title{margin-top:40px;font-size:50px}
    .slide-3 .visual-story-wrap{margin-top:20px;margin-bottom:5px}
    .slide-3 .visual-story-image{height:450px;width:700px;margin-bottom:5px}
    .slide-3 .visual-story-paragraph{font-size:20px;line-height:1.25;max-height:170px;overflow:hidden}

    .inline-footer-like{position:absolute;left:var(--m);right:var(--m);bottom:calc(30px);z-index:1;}
    .inline-footer-line{border-top:1px solid var(--gray-1)}
    .inline-footer{display:grid;grid-template-columns:repeat(12,1fr);column-gap:var(--g);font-size:12px;color:var(--gray-3);padding-top:12px}
    .f1{grid-column:1/span 4}.f2{grid-column:5/span 5}.f3{grid-column:10/span 3;text-align:right}
    """

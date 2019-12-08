export const handler = (event: any, __: any, cb: any) => {
  const password = (event.queryStringParameters || {}).uuid;

  if (!password || password.toLowerCase() !== "argos") {
    cb(null, {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html"
      },
      body: `<html><body style="
      height:  100vh;
      width:  100vh;
      background-color:  white;"><h2>Invalid Code.</h2></body></html>`
    });
  }

  cb(null, {
    statusCode: 200,
    headers: {
      "Content-Type": "text/html"
    },
    body: generateHtml()
  });
};

// <base href="https://sogra-presentation.s3.amazonaws.com/argos_seed_deck/" />

function generateHtml() {
  return `
  <!DOCTYPE html>
  <html class="sl-root decks export offline loaded">
  <head>
  <base href="https://sogra-presentation.s3.amazonaws.com/argos_seed_deck/" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, minimal-ui">
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
      <title>Argos Health Slide Deck</title>

      <meta name="description" content="Argos Health Seed Slide Deck">

      <link rel="stylesheet" type="text/css" href="lib/offline-v2.css">



  </head>
  <body class="reveal-viewport theme-font-montserrat theme-color-white-blue">
      <div class="reveal">
          <div class="slides">
              <section data-id="b57267990c19d1e26b2986bb7dacb58c"><div class="sl-block" data-block-type="text" style="width: 806px; left: 77px; top: 76px; height: auto;" data-block-id="7556ca58ee528d2041faaa41dc1c4c9b"><div class="sl-block-content" data-placeholder-tag="h1" data-placeholder-text="Title Text" style="z-index: 11;">
<h1>Argos Health</h1>
</div></div>
<div class="sl-block" data-block-type="text" data-block-id="4650d846e679dadc6821553e57e5fd7a" style="height: auto; min-width: 30px; min-height: 30px; width: 600px; left: 180px; top: 204px;"><div class="sl-block-content" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 12;">
<p>Never Miss a Beat</p>
</div></div>
<div class="sl-block" data-block-type="video" data-block-id="869577f3a0cc7acf0166922330cf4ca9" style="min-width: 30px; min-height: 30px; width: 958px; height: 342px; left: 0px; top: 280px;"><div class="sl-block-content" style="z-index: 13;" data-media-id="6736560" data-video-thumb="https://s3.amazonaws.com/media-p.slid.es/videos/1171718/Jt7om_yl/out_thumb_00001.jpg"><video playsinline="" poster="https://s3.amazonaws.com/media-p.slid.es/videos/1171718/Jt7om_yl/out_thumb_00001.jpg" muted="" loop="loop" data-autoplay="" data-paused-by-reveal="" data-lazy-loaded="" data-src="argos-health-slide-deck/8b65e3418fb7bec68472606ab5863341.mp4"></video></div></div>
<div class="sl-block" data-block-type="text" data-block-id="7ec00c9b571a3d39ddb9e3b96154c67e" style="height: auto; min-width: 30px; min-height: 30px; width: 338px; left: 622px; top: 661px;"><div class="sl-block-content" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 15;">
<p><span style="font-size:0.7em">Confidential Argos Health (C) 2019</span></p>
</div></div></section><section data-id="e9dcf2fdc2613e4c35f9ffc374096fd7"><div class="sl-block" data-block-type="text" style="width: 806px; left: 80px; top: 33px; height: auto;" data-block-id="c14384539216e3fdcbfafde6ee957cb5"><div class="sl-block-content" data-placeholder-tag="h2" data-placeholder-text="Title Text" style="z-index: 10;">
<h2 style="text-align: left;">Problem</h2>
</div></div>
<div class="sl-block" data-block-type="text" style="width: 898px; left: 34px; top: 172px; height: auto;" data-block-id="c7870d57f3b383630931a0963b0b4249"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 11;" data-fragment-index="0">
<p class="visible"><span><span style="color:rgb(89, 89, 89)">Heart electrical malfunctions lead to 300,000 annual deaths in the US and 17 million worldwide.</span></span></p>
</div></div>
<div class="sl-block" data-block-type="text" style="width: 898px; left: 34px; top: 298px; height: auto;" data-block-id="89f8e21466a3a79a372b8f1c7ddefb19"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 12;" data-fragment-index="1">
<p><span><span style="color:rgb(89, 89, 89)">11 million people in the US have some sort of cardiac arrhythmia placing them at higher risk of stroke or death. </span></span></p>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 338px; left: 622px; top: 661px;" data-block-id="13e704b7a6f8c7a37df023392aba00cb"><div class="sl-block-content" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 14;">
<p><span style="font-size:0.7em">Confidential Argos Health (C) 2019</span></p>
</div></div>
<div class="sl-block" data-block-type="text" style="width: 898px; left: 34px; top: 449px; height: auto;" data-block-id="9ebf890665b529c25ebb91479de2e194"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 15;" data-fragment-index="2">
<p><strong>Current heart monitoring technology is expensive, outdated, and cumbersome.</strong></p>
</div></div></section><section data-id="8d642576f05f8bf6a88f467fd4d56f13"><div class="sl-block" data-block-type="text" style="width: 802px; left: 80px; top: 33px; height: auto;" data-block-id="0ffd7675e1c7575fc0ce2038217c09a1"><div class="sl-block-content" data-placeholder-tag="h2" data-placeholder-text="Title Text" style="z-index: 10;">
<h2 style="text-align:left"><span><span>Vision</span></span></h2>
</div></div>
<div class="sl-block" data-block-type="text" style="width: 806px; left: 76px; top: 163px; height: auto;" data-block-id="69146093f27a03ecde5f9fcdea83d2a8"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 11;" data-fragment-index="0">
<p><span><span style="color:rgb(89, 89, 89)">We believe everyone deserves a healthy life. There should be no cost barrier, no knowledge barrier, and no connectivity barrier to understanding your heart.</span></span></p>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 338px; left: 622px; top: 661px;" data-block-id="64f3251726ab7ec3b1302ab2ce9eefd8"><div class="sl-block-content" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 13;">
<p><span style="font-size:0.7em">Confidential Argos Health (C) 2019</span></p>
</div></div>
<div class="sl-block" data-block-type="text" style="width: 806px; left: 76px; top: 408px; height: auto;" data-block-id="a2908991b678e0d8e8d6de8d0ace488e"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 14;" data-fragment-index="1">
<p><strong>We are leveraging the latest advances in ML, semiconductor technology, and cloud infrastructure to unlock ECG insights for everyone.</strong></p>
</div></div></section><section data-id="24bca2f856c698a66413009ffeb7db58"><div class="sl-block" data-block-type="text" style="width: 806px; left: 80px; top: 33px; height: auto;" data-block-id="9363f28612c914b9c9fa66069f03413b"><div class="sl-block-content" data-placeholder-tag="h2" data-placeholder-text="Subtitle" style="z-index: 11;">
<h2 style="text-align: left;">Solution</h2>
</div></div>
<div class="sl-block" data-block-type="image" data-block-id="1cf114a965bc15d49986c563089fee69" style="min-width: 4px; min-height: 4px; width: 167px; height: 167px; left: 757px; top: 127px;"><div class="sl-block-content fragment" style="z-index: 12;" data-fragment-index="0"><img data-natural-width="167" data-natural-height="167" style="" data-lazy-loaded="" data-src="argos-health-slide-deck/a6a7f505a06f1ad3c2c7d82db3fcb453.png"></div></div>
<div class="sl-block" data-block-type="text" data-block-id="c540cae0eabdf4d965f1dd31b8f4910c" style="height: auto; min-width: 30px; min-height: 30px; width: 717px; left: 2px; top: 140px;"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 13;" data-fragment-index="0">
<p><span><strong>Cardiologist on a Chip </strong></span></p>

<p><span><span style="color:rgb(89, 89, 89)">ASIC with custom ML that records, indicates, and reports cardiac arrhythmias.</span></span></p>

<p> </p>
</div></div>
<div class="sl-block" data-block-type="text" data-block-id="cf95e2825c10337bef42c3a8e420f4ef" style="height: auto; min-width: 30px; min-height: 30px; width: 910px; left: 49px; top: 326px;"><div class="sl-block-content" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 14;">
<ul>
  <li class="fragment" data-fragment-index="1" style="text-align:left"><span style="font-size:0.9em"><span style="color:rgb(89, 89, 89)">Single chip with integrated ECG system and custom ML accelerator     </span></span></li>
</ul>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 910px; left: 48px; top: 401px;" data-block-id="e88c7e8594790f4ee9790d271256fb58"><div class="sl-block-content" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 15;">
<ul>
  <li class="fragment" data-fragment-index="2" style="text-align:left"><span style="font-size:0.9em"><span style="color:rgb(89, 89, 89)">On-chip ML inference identify arrhythmias with expert level accuracy</span></span></li>
</ul>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 910px; left: 48px; top: 476px;" data-block-id="46146a0920c8b997af12b2d917ec8c2e"><div class="sl-block-content" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 16;">
<ul>
  <li class="fragment" data-fragment-index="3" style="text-align:left">
<span style="font-size:0.9em"><span style="color:rgb(89, 89, 89)">Integrated </span></span><span><span style="color:rgb(89, 89, 89)">BLE radio to interface with any smartphone                     </span></span>
</li>
</ul>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 338px; left: 620px; top: 658px;" data-block-id="36cd22c5bcab21e23a64afc351698fd2"><div class="sl-block-content" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 17;">
<p><span style="font-size:0.7em">Confidential Argos Health (C) 2019</span></p>
</div></div>
<div class="sl-block" data-block-type="text" data-block-id="5179aacbb57127f018e9d09d4adf62de" style="height: auto; min-width: 30px; min-height: 30px; width: 956px; left: 2px; top: 572px;"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 18; font-size: 80%;" data-fragment-index="4">
<h3><span style="font-size:1.2em">Enables ultra low-cost ECG monitoring solutions</span></h3>
</div></div></section><section data-id="73a0590f3eb79834ea12d2f02a70105d"><div class="sl-block" data-block-type="text" style="width: 806px; left: 80px; top: 33px; height: auto;" data-block-id="be054f788ce5edb6b156a32d41460c02"><div class="sl-block-content" data-placeholder-tag="h2" data-placeholder-text="Subtitle" style="z-index: 11;">
<h2 style="text-align: left;">Solution</h2>
</div></div>





<div class="sl-block" data-block-type="text" style="height: auto; width: 338px; left: 620px; top: 658px;" data-block-id="0aa9d737d674936e7f58b2b1305c1633"><div class="sl-block-content" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 12;">
<p><span style="font-size:0.7em">Confidential Argos Health (C) 2019</span></p>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 507px; left: 33px; top: 123px;" data-block-id="a4cb0fc099cb19b2871868c3cc6f98ae"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 13; text-align: left;" data-fragment-index="0">
<h3><span style="font-size:0.9em">Disposable ECG Patch</span></h3>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 866px; left: 33px; top: 426px;" data-block-id="f4dd65998c94aa848f737730dbd878f7"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 14; text-align: left;" data-fragment-index="1">
<h3>End-To-End Software Platform</h3>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 687px; left: 61px; top: 356px;" data-block-id="362dd272703cbcb8a48306ce3b8e8900"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 15; color: rgb(68, 68, 68);" data-fragment-index="0">
<p style="text-align:left">$1 Cost of Goods</p>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 687px; left: 61px; top: 496px;" data-block-id="a748bd04c02b13f54087b489b8c1f1e2"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 16; color: rgb(68, 68, 68);" data-fragment-index="1">
<p style="text-align: left;">iOS and Android Apps</p>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 887px; left: 61px; top: 611px;" data-block-id="53ececee8fba88357cb076cbf02d4343"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 17; color: rgb(68, 68, 68);" data-fragment-index="1">
<p style="text-align:left">AI Powered Provider flow for easy analysis and reimbursement</p>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 687px; left: 61px; top: 191px;" data-block-id="8776950774b3689956eb902db3899fdd"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 18; color: rgb(68, 68, 68);" data-fragment-index="0">
<p style="text-align:left">Bandaid like form factor</p>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 687px; left: 61px; top: 553px;" data-block-id="d871c9a5154d9f1c29fb5bb834a5a869"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 19; color: rgb(68, 68, 68);" data-fragment-index="1">
<p style="text-align:left">Patient Web Portal</p>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 687px; left: 61px; top: 244px;" data-block-id="c44abbc08ff004c7cd29ac60fdc1f620"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 20; color: rgb(68, 68, 68);" data-fragment-index="0">
<p style="text-align:left">Multi-day runtime</p>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 687px; left: 61px; top: 300px;" data-block-id="131d7871a0035e94b58968bf4e8c1a6b"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 21; color: rgb(68, 68, 68);" data-fragment-index="0">
<p style="text-align:left">Phone and cloud connectivity</p>
</div></div>
<div class="sl-block" data-block-type="image" data-block-id="9739d540730d4a5d9503803366b0a900" style="min-width: 4px; min-height: 4px; width: 326px; height: 313px; left: 557px; top: 88px;"><div class="sl-block-content" style="z-index: 22;"><img data-natural-width="326" data-natural-height="313" style="" data-lazy-loaded="" data-src="argos-health-slide-deck/84b3c345950f7886eb1c58b0fe54d1c5.png"></div></div></section><section data-id="950812dc882f9d7a4db1d290cf8facaf"><div class="sl-block" data-block-type="text" style="width: 806px; left: 80px; top: 33px; height: auto;" data-block-id="1e80774c348d608e03482dc6d27bdc0e"><div class="sl-block-content" data-placeholder-tag="h2" data-placeholder-text="Subtitle" style="z-index: 10;">
<h2 style="text-align:left">Why Now?</h2>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; width: 338px; left: 620px; top: 658px;" data-block-id="1d4945d37beb875deaedb24cea394c25"><div class="sl-block-content" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 11;">
<p><span style="font-size:0.7em">Confidential Argos Health (C) 2019</span></p>
</div></div>
<div class="sl-block" data-block-type="text" data-block-id="afe90414419eee20f5a50e5cf1d799a5" style="height: auto; min-width: 30px; min-height: 30px; width: 926px; left: 25px; top: 366px;"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 12;" data-fragment-index="2">
<p style="text-align:left">Huge growth in the power of ML based classifiers</p>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 828px; left: 58px; top: 411px;" data-block-id="aaeb89a73e7991f81344d23d8dd38531"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 14;" data-fragment-index="2">
<p style="text-align:left"><span style="color:#696969"><span style="font-size:0.9em">ML Models can now read ECGs with cardiologist level accuracy</span></span></p>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 911px; left: 25px; top: 482px;" data-block-id="3ff3292eebb037f2e6e501368bcea884"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 15;" dir="ui" data-fragment-index="3">
<p style="text-align:left">Open-source SoCs dramatically lowering ASIC development cost </p>
</div></div>

<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 854px; left: 25px; top: 552px;" data-block-id="2d111b5aa7ddea34ea9bb921ad4c3c68"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 16;" dir="ui" data-fragment-index="4">
<p style="text-align:left">SW infrastructure in place to support HIPAA and FDA compliant apps and web services</p>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 926px; left: 25px; top: 135px;" data-block-id="28ce6f184f71ef85a8c4021b3501c324"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 17;" data-fragment-index="0">
<p style="text-align:left">Rise of mobile cardiac monitoring units</p>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 899px; left: 52px; top: 179px;" data-block-id="2cd47627d87046ba29a51202c0125782"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 18;" data-fragment-index="0">
<p style="text-align:left"><span style="color:#696969"><span style="font-size:0.9em">Demonstrate demand but current solutions based on antiquated tech resulting in poor user experience</span></span></p>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 926px; left: 25px; top: 290px;" data-block-id="6d925e05701ac9e5ed410274ce7f5b98"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 19;" data-fragment-index="1">
<p style="text-align:left">Apple has opened new regulatory pathways for OTC usage</p>
</div></div></section><section data-id="3c539d0b162408a73c676e362073fa74"><div class="sl-block" data-block-type="text" data-block-id="ac303b2ee574f2a2295c369f56ae2150" style="height: auto; min-width: 30px; min-height: 30px; width: 700px; left: 80px; top: 33px;"><div class="sl-block-content" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 10;">
<h2 style="text-align: left;">Market Size</h2>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 338px; left: 622px; top: 661px;" data-block-id="2c9be64289bc416c6de79e45c038744b"><div class="sl-block-content" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 11;">
<p><span style="font-size:0.7em">Confidential Argos Health (C) 2019</span></p>
</div></div>
<div class="sl-block" data-block-type="text" data-block-id="9a9f07836436653f35e00b17cb3c97d2" style="height: auto; min-width: 30px; min-height: 30px; width: 927px; left: 17px; top: 140px;"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 12; text-align: left;" data-fragment-index="0">
<h3>Self-care medical device market is $22B/yr</h3>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 927px; left: 17px; top: 210px;" data-block-id="3dfaf1bdc405e99d9e344e71daf1ba04"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 13; text-align: left;" data-fragment-index="1">
<h3>Existing cardiac monitoring market is $2B/yr</h3>
</div></div>


<div class="sl-block" data-block-type="text" data-block-id="e683805813c84c107173f50fe6c3d871" style="height: auto; min-width: 30px; min-height: 30px; width: 896px; left: 49px; top: 272px;"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 14;" data-fragment-index="1">
<p style="text-align:left"><span><span style="color:rgb(89, 89, 89)">Served largely by <a href="https://www.nasdaq.com/market-activity/stocks/irtc" target="_blank">iRhythm</a> and <a href="https://finance.yahoo.com/quote/BEAT/" target="_blank">BioTelemetry</a> </span></span></p>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 927px; left: 17px; top: 521px;" data-block-id="c05222751e6787dbbbb3f691602fd854"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 15; text-align: left;" data-fragment-index="2">
<h3>Opportunity to grow market substantially</h3>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 878px; left: 49px; top: 591px;" data-block-id="08257218b2506a8966d8ced55f8ad7d6"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 16;" data-fragment-index="2">
<p style="text-align:left"><span><span style="color:rgb(89, 89, 89)">Over-The-Counter cardiac monitoring growing rapidly</span></span></p>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 711px; left: 80px; top: 318px;" data-block-id="2c03309dfa57cad42e7c44e2c6ffd25f"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 17;" data-fragment-index="1">
<p style="text-align:left"><span style="color:#696969">Cost many hundreds of $</span></p>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 811px; left: 80px; top: 364px;" data-block-id="631a46a4568a2f408bbb0e3eabda23aa"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 18;" data-fragment-index="1">
<p style="text-align:left"><span style="color:#696969">Devices mailed to processing facilities for data collections</span></p>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 896px; left: 49px; top: 420px;" data-block-id="5b924ee3884fb90edb02c016e13aa157"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 19;" data-fragment-index="1">
<p style="text-align:left"><font color="#595959">Apple watches now allowing for 30S spot monitoring</font></p>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 786px; left: 80px; top: 471px;" data-block-id="9a6113d3eec65f86cbfdc93f36f39d67"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 21;" data-fragment-index="1">
<p style="text-align:left"><span style="color:#696969">Unable to provide continuous monitoring</span></p>
</div></div></section><section data-id="a36895b35259dc518d7e4e0601b1c860"><div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 700px; left: 80px; top: 33px;" data-block-id="d12d91f5982ecc6f60397bfc0921bf01"><div class="sl-block-content" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 10;">
<h2 style="text-align:left">Customer Acquisition</h2>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 338px; left: 622px; top: 661px;" data-block-id="1699d69ea9e3f5c9e66f8134357dc89f"><div class="sl-block-content" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 11;">
<p><span style="font-size:0.7em">Confidential Argos Health (C) 2019</span></p>
</div></div>
<div class="sl-block" data-block-type="text" data-block-id="bb05bb7aceed4ccfe914d49607ec898e" style="height: auto; min-width: 30px; min-height: 30px; width: 921px; left: 39px; top: 152px;"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 12;" data-fragment-index="0">
<h3 style="text-align:left"><span style="font-size:0.9em">Uniquely positioned for OTC</span></h3>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 822px; left: 80px; top: 402px;" data-block-id="ff87f6b7f8e585e52c6bf4eb96914c54"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 13; color: rgb(68, 68, 68);" data-fragment-index="1">
<p style="text-align:left">Providers can seek reimbursement through established CPT Codes</p>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 822px; left: 80px; top: 490px;" data-block-id="faba01c69de8229baf7afd15380882bf"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 14; color: rgb(68, 68, 68);" data-fragment-index="1">
<p style="text-align:left">Patients would enroll in subscription service</p>
</div></div>

<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 895px; left: 39px; top: 545px;" data-block-id="034b3fe8b9032cdd51c3ff855a3f291c"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 15;" data-fragment-index="2" dir="ui">
<h3 style="text-align:left"><span style="font-size:0.9em">Affordable, comprehensive, and easy to use platform</span></h3>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 822px; left: 80px; top: 273px;" data-block-id="978188d8a0d7f612608050492bdbf880"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 16; color: rgb(68, 68, 68);" data-fragment-index="0">
<p style="text-align:left"><span style="font-size:1.0em">100x cheaper than competitors</span></p>
</div></div>

<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 822px; left: 80px; top: 218px;" data-block-id="136f23768ac12dfa68d3c52abf78839b"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 18; color: rgb(68, 68, 68);" data-fragment-index="0">
<p style="text-align:left">Newly established paths for OTC usage</p>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 921px; left: 39px; top: 342px;" data-block-id="eb0494ced0af85e533274ff12937d631"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 19;" data-fragment-index="1">
<h3 style="text-align:left"><span style="font-size:35.1px">Devices free to providers</span></h3>
</div></div></section><section data-id="ade5eac893fbd3815299ab5ff4944bdb"><div class="sl-block" data-block-type="text" style="height: auto; width: 700px; left: 80px; top: 33px;" data-block-id="b23517ebe89576572df9c487c855113c"><div class="sl-block-content" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 10;">
<h2 style="text-align:left">Roadmap</h2>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 338px; left: 622px; top: 661px;" data-block-id="8a8e16e5c777a21e30183c3e26bc9903"><div class="sl-block-content" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 11;">
<p><span style="font-size:0.7em">Confidential Argos Health (C) 2019</span></p>
</div></div>

<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 847px; left: 49px; top: 140px;" data-block-id="2a49c353349fa487ee2b76d004a17d9e"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 12; text-align: center;" data-fragment-index="0">
<h3>Next 12 months</h3>
</div></div>


<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 847px; left: 49px; top: 466px;" data-block-id="bae9dd9e6300200da8a6da4948e16952"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 13; text-align: center;" data-fragment-index="1">
<h3>Next 24 months</h3>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 847px; left: 49px; top: 202px;" data-block-id="c22d578e41ab148fb7cbf225d3563dd0"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 14; color: rgb(68, 68, 68); text-align: center;" data-fragment-index="0">
<p>Tapeout ASIC</p>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 847px; left: 49px; top: 251px;" data-block-id="4c7e014a2292f6971ebdf894c37b3acb"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 15; color: rgb(68, 68, 68); text-align: center;" data-fragment-index="0">
<p>Integrated packaging for patch</p>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 847px; left: 49px; top: 401px;" data-block-id="601161e31d0f9fab42c9473b6091160c"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 16; color: rgb(68, 68, 68); text-align: center;" data-fragment-index="0">
<p>ECG Analysis Platform</p>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 847px; left: 49px; top: 298px;" data-block-id="a19632d1e90c5671f4a142f1ae4ce817"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 17; color: rgb(68, 68, 68); text-align: center;" data-fragment-index="0">
<p>iOS and Android App</p>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 847px; left: 49px; top: 350px;" data-block-id="e55aa1672afcc5f123964214c2733a57"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 18; color: rgb(68, 68, 68); text-align: center;" data-fragment-index="0">
<p>Cloud Integration</p>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 847px; left: 49px; top: 529px;" data-block-id="d7aa36960a8fc82c120c02314768b722"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 19; color: rgb(68, 68, 68); text-align: center;" data-fragment-index="1">
<p>FDA approval for device and analysis platform</p>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 847px; left: 49px; top: 580px;" data-block-id="40c21d037a4f0c16dc93346451fabf0a"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 21; color: rgb(68, 68, 68); text-align: center;" data-fragment-index="1">
<p>Launch products</p>
</div></div></section><section data-id="612bb9c7bf6bcf4d2c8af55ce1d862ce"><div class="sl-block" data-block-type="text" style="height: auto; width: 700px; left: 80px; top: 33px;" data-block-id="de2fe5a8b70587f5c1eb0269dc594c2b"><div class="sl-block-content" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 10;">
<h2 style="text-align:left">Projections</h2>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; width: 338px; left: 622px; top: 661px;" data-block-id="b1fcb04e794dfacf1019cb90af4ac816"><div class="sl-block-content" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 11;">
<p><span style="font-size:0.7em">Confidential Argos Health (C) 2019</span></p>
</div></div>
<div class="sl-block" data-block-type="text" data-block-id="990bed90fd534a045af992e83d5bb877" style="height: auto; min-width: 30px; min-height: 30px; width: 818px; left: 42px; top: 140px;"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 12;" data-fragment-index="0">
<h3 style="text-align: left;">Initial revenue through device sales and patient/provider subscriptions</h3>
</div></div>

<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 822px; left: 80px; top: 250px;" data-block-id="825eb430036cfac9226690a8f00a9643"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 13;" data-fragment-index="0">
<p style="text-align:left">$20 for 4 Patches</p>
</div></div>


<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 822px; left: 80px; top: 298px;" data-block-id="264a44da19c9a761c102dad1fbeb17e6"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 15;" data-fragment-index="0">
<p style="text-align:left">$15/Month subscription to interface with provider</p>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 818px; left: 42px; top: 535px;" data-block-id="7b9881e531336543ca3734f6521e371b"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 16;" data-fragment-index="1" dir="ui">
<h3 style="text-align:left">License FDA cleared ML models</h3>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 822px; left: 80px; top: 350px;" data-block-id="1a10022d28c7b9bfa8f33b3b337013ad"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 17;" data-fragment-index="0">
<p style="text-align:left">$30 review by Argos Certified Physician</p>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 822px; left: 80px; top: 400px;" data-block-id="0a8775a57584a038c3af6267965e0f1e"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 18;" data-fragment-index="0">
<p style="text-align:left">Providers can earn $60 using our platform through established CPT codes </p>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 866px; left: 80px; top: 591px;" data-block-id="81c8223581a8d31bb77e24841f3c371e"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 19;" data-fragment-index="0">
<p style="text-align:left">ML Models tailored for ultra low power, embedded platforms</p>
</div></div></section><section data-id="4c56329182b3afaa73dded50678edaa9"><div class="sl-block" data-block-type="text" style="height: auto; width: 700px; left: 80px; top: 33px;" data-block-id="a1a81453c6db46d89aea0e4d03a639d8"><div class="sl-block-content" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 10;">
<h2 style="text-align:left">What have we done?</h2>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 338px; left: 622px; top: 661px;" data-block-id="d6cce2547616333ad79ba463bd2ecc82"><div class="sl-block-content" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 11;">
<p><span style="font-size:0.7em">Confidential Argos Health (C) 2019</span></p>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 841px; left: 39px; top: 169px;" data-block-id="ebf7d91f6d45d73a56fb4c104d12e75d"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 12;" data-fragment-index="0">
<h3 style="text-align:left">End-to-End working prototype</h3>
</div></div>



<div class="sl-block" data-block-type="text" style="height: auto; width: 841px; left: 80px; top: 231px;" data-block-id="6d56ce9ab7ea3e7b929500e270bb3396"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 13; color: rgb(68, 68, 68);" data-fragment-index="0">
<p style="text-align:left">Multiple device prototypes</p>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; width: 841px; left: 80px; top: 291px;" data-block-id="55e4903689482af9643f1decc2bc09ae"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 15; color: rgb(68, 68, 68);" data-fragment-index="0">
<p style="text-align:left">Android and iOS App</p>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; width: 841px; left: 80px; top: 350px;" data-block-id="78d97e7b0d256f153d59ab207c912c4d"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 16; color: rgb(68, 68, 68);" data-fragment-index="0">
<p style="text-align:left">Web Portal to view traces in real-time</p>
</div></div>

<div class="sl-block" data-block-type="text" style="height: auto; width: 858px; left: 80px; top: 413px;" data-block-id="95d272697be97938f881f76b41347d5f"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 17; color: rgb(68, 68, 68);" data-fragment-index="0">
<p style="text-align:left">ML model classifying rhythms with cardiologist level accuracy</p>
</div></div></section><section data-id="0b01e5ee3fb8e6277306aea5865587ea"><div class="sl-block" data-block-type="text" style="height: auto; width: 700px; left: 80px; top: 33px;" data-block-id="be11e6b2648a5c2cd00235a13d84ac67"><div class="sl-block-content" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 10;" dir="ui">
<h2 style="text-align:left">Long Term</h2>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 338px; left: 622px; top: 661px;" data-block-id="17dbcc1d6241c8a4ee54e9c53697d01c"><div class="sl-block-content" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 11;">
<p><span style="font-size:0.7em">Confidential Argos Health (C) 2019</span></p>
</div></div>
<div class="sl-block" data-block-type="text" data-block-id="8f0e161534f23bb95525ccca0f828648" style="height: auto; min-width: 30px; min-height: 30px; width: 888px; left: 17px; top: 150px;"><div class="sl-block-style" style="z-index: 12; transform: rotate(360deg);"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 12;" data-fragment-index="0">
<p><span style="color:#000000">Our ML platform uniquely targets 1D signals while most ML inference engines target 2D signals (e.g. images). We want to use the same core tech to create new monitoring solutions both in healthcare and beyond. </span></p>
</div></div></div>
<div class="sl-block" data-block-type="text" data-block-id="2d5d95b7157c0192906a61985c5e97c8" style="height: auto; min-width: 30px; min-height: 30px; width: 931px; left: 17px; top: 342px;"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 13;" data-fragment-index="1">
<p style="color:rgb(89, 89, 89); text-align:left"><span style="color:#000000">Fetal Heart Monitoring </span></p>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 931px; left: 17px; top: 443px;" data-block-id="3f6f51e114333973160bb13dc5cc8829"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 14;" data-fragment-index="2">
<p class="visible" style="color:rgb(89, 89, 89); text-align:left"><span style="color:#000000">Smart labels </span></p>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 931px; left: 15px; top: 581px;" data-block-id="ab77ca0d9a695fb01790f85996320af1"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 15;" dir="ui" data-fragment-index="3">
<p class="visible" style="color:rgb(89, 89, 89); text-align:left"><span style="color:#000000">Security Sticker</span></p>

<p style="color:rgb(89, 89, 89)"><span style="color:#696969">Smart sticker on window to detect breaks   </span>                        </p>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 876px; left: 72px; top: 490px;" data-block-id="07a45a49ffd958b85bda6df29a457a44"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 16;" data-fragment-index="2">
<p class="visible" style="color:rgb(89, 89, 89); text-align:left"><span><span>Monitor packages for temperature and vibration during shipment</span></span></p>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 876px; left: 72px; top: 389px;" data-block-id="90e62ec41cb251c91d012e271df858c9"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 18;" data-fragment-index="2">
<p style="color:rgb(89, 89, 89); text-align:left"><span><span>Long duration patch to monitor fetal heartbeat</span></span></p>
</div></div></section><section data-id="b5e2097b1078bb523615ab7a8a5c3323"><div class="sl-block" data-block-type="text" style="height: auto; width: 700px; left: 80px; top: 33px;" data-block-id="2cf0838ba945ca2a7bb6610b33ccb886"><div class="sl-block-content" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 11;" dir="ui">
<h2 style="text-align:left">Team</h2>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; min-width: 30px; min-height: 30px; width: 338px; left: 622px; top: 661px;" data-block-id="ca328b7af367c9362b7644828a17571e"><div class="sl-block-content" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 12;">
<p><span style="font-size:0.7em">Confidential Argos Health (C) 2019</span></p>
</div></div>
<div class="sl-block" data-block-type="text" data-block-id="5fa73a336d3c04f138f980553f63fbbb" style="height: auto; min-width: 30px; min-height: 30px; width: 600px; left: 346px; top: 149px;"><div class="sl-block-content" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 13;">
<p><span><span style="color:rgb(89, 89, 89)">PhD in Biomedical Engineering from the University of Minnesota. Lead engineer at </span><a href="http://butterflynetwork.com" target="_blank"><span style="color:rgb(0, 151, 167)">Butterfly Network</span></a><span style="color:rgb(89, 89, 89)"> developing ultrasound on a chip. Google designing flagship ML Accelerator (Tensor Processing Unit).</span></span></p>
</div></div>
<div class="sl-block" data-block-type="text" data-block-id="6710001b3cfc1977a8b175f7588da159" style="height: auto; min-width: 30px; min-height: 30px; width: 600px; left: 346px; top: 482px;"><div class="sl-block-content" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 14;">
<p><span><span style="color:rgb(89, 89, 89)">Goldman Sachs, Facebook, Google. Currently manager for Edge Infrastructure and Tech Lead of international expansion at StockX.</span></span></p>
</div></div></section><section data-id="ec8ace839502e43da1b50e14e940efb7"><div class="sl-block" data-block-type="text" style="height: auto; width: 700px; left: 80px; top: 33px;" data-block-id="5945694ec6d1a3ad626ad2ee3be95779"><div class="sl-block-content" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 10;" dir="ui">
<h2 style="text-align:left">Funding</h2>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; width: 338px; left: 622px; top: 661px;" data-block-id="bf4925e777e4b7833534e64d6865c6a4"><div class="sl-block-content" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 11;">
<p><span style="font-size:0.7em">Confidential Argos Health (C) 2019</span></p>
</div></div>
<div class="sl-block" data-block-type="text" style="height: auto; width: 921px; left: 20px; top: 151px;" data-block-id="c3092a242d39ca3f21819d2f1d69940d"><div class="sl-block-content fragment" data-placeholder-tag="p" data-placeholder-text="Text" style="z-index: 12; text-align: left; font-size: 110%;" data-fragment-index="0" dir="ui">
<p><span><strong>We’re raising $1.5M seed round</strong></span></p>

<p> </p>

<p>Develop ECG analysis software and send for 510k Approval</p>

<p><span style="color:#000000">     Essentially a product in itself and will serve as predicate         for future device</span></p>

<p>Design ASIC around the ECG analysis software</p>

<p>    Confirms price, power, performance of to ensure we will      hit required targets</p>

<p>Build out provider workflows and EHR integration</p>
</div></div></section>
          </div>
      </div>

      <script>
          var SLConfig = {"deck": {"id":1640778,"slug":"argos-health-slide-deck","title":"Argos Health Slide Deck","description":"Argos Health Seed Slide Deck","width":960,"height":700,"visibility":"self","published_at":null,"sanitize_messages":null,"thumbnail_url":"https://s3.amazonaws.com/media-p.slid.es/thumbnails/7dd479647c3972f584e5e2f80a20f51a/thumb.jpg?1573255007","view_count":0,"user":{"id":1171718,"username":"andrewcasper","name":"Andrew Casper","description":null,"thumbnail_url":"https://lh3.googleusercontent.com/-e19AHkkLDP0/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3reQ1vTgWKq3WLDge8mCvz0Ms4DJdg/photo.jpg","paid":true,"pro":false,"lite":true,"team_id":null,"settings":{"id":4182983,"present_controls":true,"present_upsizing":true,"present_pointer":false,"present_notes":true,"default_deck_tag_id":null}},"background_transition":"slide","transition":"slide","theme_id":null,"theme_font":"montserrat","theme_color":"white-blue","auto_slide_interval":0,"comments_enabled":true,"forking_enabled":false,"rolling_links":false,"center":false,"shuffle":false,"should_loop":false,"share_notes":false,"slide_number":false,"slide_count":14,"rtl":false,"version":2,"collaborative":null,"deck_user_editor_limit":1,"data_updated_at":1574625762969,"font_typekit":null,"font_google":null,"time_limit":null,"upsizing_enabled":true,"notes":{"3c539d0b162408a73c676e362073fa74":"$21 Billion, https://www.imarcgroup.com/self-care-medical-devices-market\n\nCardiac Monitoring https://www.alliedmarketresearch.com/cardiac-monitoring-and-cardiac-rhythm-management-market\n\nhttps://www.businesswire.com/news/home/20170505005287/en/Cardiac-Event-Recorder-Market-Reach-4.8-Billion","950812dc882f9d7a4db1d290cf8facaf":"https://arxiv.org/pdf/1512.03385"}}};


          // Use local fonts
          SLConfig.fonts_url = 'lib/fonts/';
      </script>

      <script src="lib/reveal.min.js"></script>
      <script src="lib/offline.js"></script>

      <!-- Initialize the presentation -->
      <script>
          Reveal.initialize({
              width: 960,
              height: 700,
              margin: 0.05,
              

              hash: true,
              controls: true,
              progress: true,
              mouseWheel: false,
              showNotes: false,
              slideNumber: false,

              autoSlide: 0,
              autoSlideStoppable: true,

              center: false,
              shuffle: false,
              loop: false,
              rtl: false,

              transition: "slide",
              backgroundTransition: "slide",

              highlight: {
                  escapeHTML: false
              },

              dependencies: [
                  { src: 'lib/reveal-plugins/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
                  { src: 'lib/reveal-plugins/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
                  { src: 'lib/reveal-plugins/highlight/highlight.js' },
                  { src: 'lib/reveal-plugins/notes/notes.js', async: true, condition: function() { return !!document.body.classList; } },
                  { src: 'lib/reveal-plugins/zoom/zoom.js', async: true }
              ]
          });
      </script>

      

  </body>
</html>

  `;
}

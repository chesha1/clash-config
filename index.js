// 全局拓展脚本

const myProxyGroups = () => {
  let mySet = new Set([
    {
      'name': 'Japan',
      'type': 'select',
      'include-all-proxies': true,
      'filter': '日本',
    },
    {
      'name': 'Taiwan',
      'type': 'select',
      'include-all-proxies': true,
      'filter': '台湾',
    },
  ]);
  return Array.from(mySet);
};

const myRules = () => {
  let mySet = new Set([
    'DOMAIN-SUFFIX,adobe.com,REJECT', // Adobe 盗版检测
    'DOMAIN-SUFFIX,adobe.io,REJECT', // Adobe 盗版检测
    'DOMAIN-SUFFIX,adobestats.io,REJECT', // Adobe 盗版检测
    'DOMAIN-SUFFIX,aistudio.google.com,Japan',
    'DOMAIN-SUFFIX,alkalimakersuite-pa.clients6.google.com,Japan', // Google AI Studio
    'DOMAIN-SUFFIX,api.openai.com,Japan',
    'DOMAIN-SUFFIX,api.voct.dev,Japan', // ai 公益站
    'DOMAIN-SUFFIX,binance.com,Taiwan',
    'DOMAIN-SUFFIX,clerk.openrouter.ai,Japan',
    'DOMAIN-SUFFIX,generativelanguage.googleapis.com,Japan',
    'DOMAIN-SUFFIX,img.bgstatic.com,Taiwan',
    'DOMAIN-SUFFIX,img.bitgetimg.com,Taiwan',
    'DOMAIN-SUFFIX,linux.do,Proxies',
    'DOMAIN-SUFFIX,maa.plus,Proxies',
    'DOMAIN-SUFFIX,mcr.microsoft.com,Proxies', // dev container 镜像下载
    'DOMAIN-SUFFIX,openrouter.ai,Japan',
    'DOMAIN-SUFFIX,poe.com,Proxies',
    'DOMAIN-SUFFIX,prts.plus,Proxies',
    'DOMAIN-SUFFIX,tradingview.com,Proxies',
    'DOMAIN-SUFFIX,truthsocial.com,Japan',
    'DOMAIN-SUFFIX,und3fy-my.sharepoint.com,Proxies', // decrypt.day 下载
  ]);
  return Array.from(mySet);
};

function main(config) {
  config['proxy-groups'].push(...myProxyGroups());
  config['rules'].push(...myRules());
  return config;
}

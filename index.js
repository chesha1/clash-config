// 全局拓展脚本

const myProxyGroups = () => {
  let mySet = new Set([
    {
      'name': 'America',
      'type': 'select',
      'include-all-proxies': true,
      'filter': '美国',
    },
    {
      'name': 'Hong Kong',
      'type': 'select',
      'include-all-proxies': true,
      'filter': '香港',
    },
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
    // 国内网络环境较特殊，部分机场会主动限制 UDP，导致某些节点通过 QUIC 访问 YouTube 时
    // 速度只有几百 KB/s；因此统一拒绝 UDP/443，关闭 QUIC 并让连接回退到 TCP。
    'AND,((NETWORK,UDP),(DST-PORT,443)),REJECT',
    'DOMAIN-SUFFIX,adobe.com,REJECT', // Adobe 盗版检测
    'DOMAIN-SUFFIX,adobe.io,REJECT', // Adobe 盗版检测
    'DOMAIN-SUFFIX,adobestats.io,REJECT', // Adobe 盗版检测
    'DOMAIN-SUFFIX,aistudio.google.com,Japan',
    'DOMAIN-SUFFIX,alkalimakersuite-pa.clients6.google.com,Japan', // Google AI Studio
    'DOMAIN-SUFFIX,api.openai.com,Japan',
    'DOMAIN-SUFFIX,api.voct.dev,Japan', // ai 公益站
    'DOMAIN-SUFFIX,binance.com,Taiwan',
    'DOMAIN-SUFFIX,bloomberg.com,Taiwan', // bloomberg 日本无法访问
    'DOMAIN-SUFFIX,clerk.openrouter.ai,Japan',
    'DOMAIN-SUFFIX,cursor-cdn.com,Japan',
    'DOMAIN-SUFFIX,cursor.com,Japan',
    'DOMAIN-SUFFIX,cursor.sh,Japan',
    'DOMAIN-SUFFIX,cursorapi.com,Japan',
    'DOMAIN-SUFFIX,ethena.fi,Taiwan',
    'DOMAIN-SUFFIX,eu4cn.com,DIRECT',
    'DOMAIN-SUFFIX,fcyfzk.cn,Proxies', // 51cg1
    'DOMAIN-SUFFIX,generativelanguage.googleapis.com,Japan',
    'DOMAIN-SUFFIX,hanime1.me,Hong Kong', // 只有香港可以访问，台湾日本都不行
    'DOMAIN-SUFFIX,img.bgstatic.com,Taiwan',
    'DOMAIN-SUFFIX,img.bitgetimg.com,Taiwan',
    'DOMAIN-SUFFIX,imgur.com,America',
    'DOMAIN-SUFFIX,learning.google.com,America',
    'DOMAIN-SUFFIX,linux.do,Proxies',
    'DOMAIN-SUFFIX,maa.plus,Proxies',
    'DOMAIN-SUFFIX,mcr.microsoft.com,Proxies', // dev container 镜像下载
    'DOMAIN-SUFFIX,ondo.finance,Hong Kong',
    'DOMAIN-SUFFIX,openrouter.ai,Japan',
    'DOMAIN-SUFFIX,pendle.finance,Proxies',
    'DOMAIN-SUFFIX,poe.com,Proxies',
    'DOMAIN-SUFFIX,polymarket.com,Hong Kong',
    'DOMAIN-SUFFIX,prts.plus,Proxies',
    'DOMAIN-SUFFIX,rsshub.app,Proxies',
    'DOMAIN-SUFFIX,tradingview.com,Proxies',
    'DOMAIN-SUFFIX,truthsocial.com,Japan',
    'DOMAIN-SUFFIX,und3fy-my.sharepoint.com,Proxies', // decrypt.day 下载
    'DOMAIN-SUFFIX,vsassetscdn.azure.cn,Proxies', // vscode marketplace
  ]);
  return Array.from(mySet);
};

// TODO: 用 geosite 改造，但是有点麻烦，所以直接写 rules 了
// see also: https://github.com/v2fly/domain-list-community
// see also: https://wiki.metacubex.one/example/conf/?h=geosite#__tabbed_2_1
function main(config) {
  config['proxy-groups'].push(...myProxyGroups());
  config['rules'].unshift(...myRules());

  // 禁止 ipv6，避免微信上传图片异常, see also: https://github.com/clash-verge-rev/clash-verge-rev/issues/1762
  // config['dns'].ipv6 = false;
  return config;
}

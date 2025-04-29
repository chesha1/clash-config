// 全局拓展脚本
// 需要三个代理组
// Proxies：常规代理组
// Japan：常规限制国家的服务
// Taiwan：加密货币服务
const getArray = () => {
  let mySet = new Set([
    'DOMAIN-SUFFIX,adobe.com,REJECT', // Adobe 盗版检测
    'DOMAIN-SUFFIX,adobe.io,REJECT', // Adobe 盗版检测
    'DOMAIN-SUFFIX,adobestats.io,REJECT', // Adobe 盗版检测
    'DOMAIN-SUFFIX,aistudio.google.com,Japan',
    'DOMAIN-SUFFIX,alkalimakersuite-pa.clients6.google.com,Japan', // Google AI Studio
    'DOMAIN-SUFFIX,api.openai.com,Japan',
    'DOMAIN-SUFFIX,binance.com,Taiwan',
    'DOMAIN-SUFFIX,clerk.openrouter.ai,Japan',
    'DOMAIN-SUFFIX,generativelanguage.googleapis.com,Japan',
    'DOMAIN-SUFFIX,img.bgstatic.com,Taiwan',
    'DOMAIN-SUFFIX,img.bitgetimg.com,Taiwan',
    'DOMAIN-SUFFIX,linux.do,Proxies',
    'DOMAIN-SUFFIX,mcr.microsoft.com,Proxies', // dev container 镜像下载
    'DOMAIN-SUFFIX,openrouter.ai,Japan',
    'DOMAIN-SUFFIX,poe.com,Proxies',
    'DOMAIN-SUFFIX,tradingview.com,Proxies',
    'DOMAIN-SUFFIX,truthsocial.com,Japan',
    'DOMAIN-SUFFIX,und3fy-my.sharepoint.com,Proxies', // decrypt.day 下载

  ]);
  return Array.from(mySet);
};

/**
 * 配置中的规则"config.rules"是一个数组，通过新旧数组合并来添加
 * @param prependRule 添加的数组
 */
const prependRule = getArray();
function main(config) {
  // 把旧规则合并到新规则后面(也可以用其它合并数组的办法)
  let oldrules = config['rules'];
  config['rules'] = prependRule.concat(oldrules);
  return config;
}

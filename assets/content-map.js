// assets/content-map.js
// Content map for site sections, tags, and search

const contentMap = {
  siteRoot: "https://index-web-i-game.com.cn",
  primaryTag: "爱游戏",
  sections: [
    {
      id: "section-01",
      title: "首页精选",
      slug: "home-featured",
      keywords: ["爱游戏", "热门推荐", "新游上线"],
      items: [
        { name: "今日推荐", link: "/recommend/today" },
        { name: "新游预约", link: "/upcoming" }
      ]
    },
    {
      id: "section-02",
      title: "攻略专区",
      slug: "guides",
      keywords: ["爱游戏", "攻略", "技巧", "通关"],
      items: [
        { name: "新手入门", link: "/guides/beginner" },
        { name: "进阶技巧", link: "/guides/advanced" },
        { name: "隐藏成就", link: "/guides/achievements" }
      ]
    },
    {
      id: "section-03",
      title: "社区动态",
      slug: "community",
      keywords: ["爱游戏", "社区", "讨论", "活动"],
      items: [
        { name: "热门话题", link: "/community/hot" },
        { name: "玩家投稿", link: "/community/submissions" },
        { name: "官方公告", link: "/community/announcements" }
      ]
    },
    {
      id: "section-04",
      title: "游戏百科",
      slug: "wiki",
      keywords: ["爱游戏", "百科", "资料", "背景"],
      items: [
        { name: "世界观", link: "/wiki/lore" },
        { name: "角色图鉴", link: "/wiki/characters" },
        { name: "道具列表", link: "/wiki/items" }
      ]
    },
    {
      id: "section-05",
      title: "排行与数据",
      slug: "rankings",
      keywords: ["爱游戏", "排行", "数据", "统计"],
      items: [
        { name: "人气榜", link: "/rankings/popular" },
        { name: "评分榜", link: "/rankings/ratings" },
        { name: "更新日志", link: "/rankings/changelog" }
      ]
    }
  ]
};

function searchContent(query, source = contentMap) {
  const results = [];
  const lowerQuery = query.toLowerCase().trim();

  if (!lowerQuery) {
    return results;
  }

  for (const section of source.sections) {
    const matchedKeywords = section.keywords.filter(kw =>
      kw.toLowerCase().includes(lowerQuery)
    );

    const matchedItems = section.items.filter(item =>
      item.name.toLowerCase().includes(lowerQuery) ||
      item.link.toLowerCase().includes(lowerQuery)
    );

    if (matchedKeywords.length > 0 || matchedItems.length > 0) {
      results.push({
        sectionId: section.id,
        sectionTitle: section.title,
        matchedKeywords,
        matchedItems: matchedItems.map(item => ({
          name: item.name,
          link: item.link
        }))
      });
    }
  }

  return results;
}

function filterByTag(tag, source = contentMap) {
  const lowerTag = tag.toLowerCase().trim();
  return source.sections.filter(section =>
    section.keywords.some(kw => kw.toLowerCase() === lowerTag)
  );
}

function listAllItemLinks(source = contentMap) {
  const links = [];
  for (const section of source.sections) {
    for (const item of section.items) {
      links.push({
        section: section.title,
        name: item.name,
        fullUrl: source.siteRoot + item.link
      });
    }
  }
  return links;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { contentMap, searchContent, filterByTag, listAllItemLinks };
}
export const DatabaseTable = {
	Article: "article",
	Tag: "tag",
	Timeline: "timeline",
	Category: "category",
	User: "user",
	ArticleTag: "article_tag",
	UserArticle: "user_article",
	ArticleTimeline: "article_timeline",
	ArticleCategory: "article_category",
};

export const References = {
	article: `${DatabaseTable.Article}.id`,
	tag: `${DatabaseTable.Tag}.id`,
	timeline: `${DatabaseTable.Timeline}.id`,
	user: `${DatabaseTable.User}.id`,
	category: `${DatabaseTable.Category}.id`,
};

export const Foreigns = {
	article: `article_id`,
	user: `user_id`,
	tag: `tag_id`,
	timeline: `timeline_id`,
	category: "category_id",
};

export const ArticleStatus = {
	hide: 0,
	display: 1,
	invalide: 2,
};

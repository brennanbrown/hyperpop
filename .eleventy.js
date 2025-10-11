const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const Image = require("@11ty/eleventy-img");

module.exports = function(eleventyConfig) {
  
  // Add syntax highlighting
  eleventyConfig.addPlugin(syntaxHighlight);
  
  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy({"src/robots.txt": "robots.txt"});
  eleventyConfig.addPassthroughCopy({"src/sw.js": "sw.js"});
  eleventyConfig.addPassthroughCopy({"src/hyperpop-demo.png": "hyperpop-demo.png"});
  
  // Watch for CSS changes
  eleventyConfig.addWatchTarget("src/assets/css/");
  eleventyConfig.addWatchTarget("src/assets/js/");
  
  // Custom date filters
  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd LLL yyyy");
  });
  
  eleventyConfig.addFilter("htmlDateString", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  });
  
  eleventyConfig.addFilter("dateToRfc3339", date => {
    return new Date(date).toISOString();
  });
  
  eleventyConfig.addFilter("getNewestCollectionItemDate", collection => {
    return collection[collection.length - 1].date;
  });
  
  // Custom excerpt filter
  eleventyConfig.addFilter("excerpt", (post) => {
    const content = post.replace(/(<([^>]+)>)/gi, "");
    return content.substr(0, 200) + "...";
  });
  
  // Limit filter
  eleventyConfig.addFilter("limit", (array, limit) => {
    return array.slice(0, limit);
  });
  
  // Image shortcode with optimization
  eleventyConfig.addNunjucksAsyncShortcode("image", async function(src, alt, sizes = "100vw") {
    let metadata = await Image(src, {
      widths: [300, 600, 1200],
      formats: ["webp", "jpeg"],
      outputDir: "./_site/assets/images/optimized/",
      urlPath: "/assets/images/optimized/"
    });
    
    let imageAttributes = {
      alt,
      sizes,
      loading: "lazy",
      decoding: "async",
      class: "glitch-image"
    };
    
    return Image.generateHTML(metadata, imageAttributes);
  });
  
  // Collections
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md").reverse();
  });
  
  eleventyConfig.addCollection("tagList", function(collection) {
    let tagSet = new Set();
    collection.getAll().forEach(item => {
      (item.data.tags || []).forEach(tag => tagSet.add(tag));
    });
    return [...tagSet].sort();
  });
  
  eleventyConfig.addCollection("searchIndex", function(collection) {
    return collection.getAll()
      .filter(item => item.data.title)
      .map(item => ({
        title: item.data.title,
        excerpt: item.data.excerpt || "",
        url: item.url,
        tags: item.data.tags || [],
        date: item.date
      }));
  });
  
  // Markdown configuration
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  });
  eleventyConfig.setLibrary("md", markdownLibrary);
  
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};

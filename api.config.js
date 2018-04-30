module.exports = {
  "baseURI": `https://nishida.lol/wp-json`,
  "api": {
    "meta": {
      "get": {
        "/": "/"
      }
    },
    "post": {
      "get": {
        "/posts": `/wp/v2/posts`,
        "/posts/:id": `/wp/v2/posts`
      },
      "post": {
        "/posts": `/wp/v2/posts`
      },
      "put": {
        "/posts/:id": `/wp/v2/posts`
      },
      "delete": {
        "/posts/:id": `/wp/v2/posts`
      }
    },
    "category": {
      "get": {
        "/categories": `/wp/v2/categories`,
        "/categories/:id": `/wp/v2/categories`
      },
      "post": {
        "/categories": `/wp/v2/categories`
      },
      "put": {
        "/categories/:id": `/wp/v2/categories`
      },
      "delete": {
        "/categories/:id": `/wp/v2/categories`
      }
    },
    "page": {
      "get": {
        "/pages": `/wp/v2/pages`,
        "/pages/:id": `/wp/v2/pages`
      },
      "post": {
        "/pages": `/wp/v2/pages`
      },
      "put": {
        "/pages/:id": `/wp/v2/pages`
      },
      "delete": {
        "/pages/:id": `/wp/v2/pages`
      }
    },
    "sale": {
      "get": {
        "/posts": `/wp/v2/posts`,
        "/posts/:id": `/wp/v2/posts`
      },
      "post": {
        "/posts": `/wp/v2/posts`
      },
      "put": {
        "/posts/:id": `/wp/v2/posts`
      },
      "delete": {
        "/posts/:id": `/wp/v2/posts`
      }
    }
  },
  "map": {
    "post": {
      "base": "",
      "props": {
        "id": "id",
        "title": "title.rendered",
        "content": "content.rendered",
        "excerpt": "excerpt.rendered",
        "type": "type",
        "slug": "slug",
        "date": "date",
        "categories": "",
        "images": {
          "extends": "image",
          "base": "_embedded.wp:featuredmedia"
        },
        "terms": {
          "extends": "term",
          "base": "_embedded.wp:term",
          "props": {
          }
        },
        "author": {
          "one": true,
          "extends": "author",
          "base": "_embedded.author",
          "props": {
          }
        }
      }
    },
    "page": {
      "extends": "post"
    },
    "category": {
      "extends": "term"
    },
    "term": {
      "id": "id",
      "count": "count",
      "description": "description",
      "link": "link",
      "name": "name",
      "slug": "slug",
      "parent": "parent"
    },
    "image": {
      "id": "id",
      "title": "title.rendered",
      "caption": "caption.rendered",
      "alt": "alt_text",
      "url": "source_url",
      "sizes": "media_details.sizes"
    },
    "author": {
      "id": "id",
      "name": "name",
      "url": "url",
      "description": "description",
      "link": "link"
    }
  }
}
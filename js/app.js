const db = new LocalDb('Entspot');


new Vue({
    el: '#main',
    mixins : [homeUtils],
    router,
    // components : 
    data: {
        postBody : '',
        postTitle : '',
        postTitle : '',
        poster : '',
        postPicture : '',
        avatar :'',
        posts : '',
    },

    created: function () {
            db.create('blog_posts', 'id', {
                name:'id',
                type:'integer',
                }, {
                name:'title',
                type:'string',
                }, {
                name:'slug',
                type:'string',
                }, {
                name:'body',
                type:'string',
                }, {
                name:'poster',
                type:'string',
                }, {
                name:'created_on',
                type:'string',
                }, {
                name:'edited_on',
                type:'string',
                }, {
                name:'edited_posts',
                type:'string',
            }, {
                name:'photo',
                type:'string',
            }, {
                name:'edited',
                type:'boolean',
                default: false,
            }, {
                name:'comment_count',
                type:'int',
                default: 0,
            });
        
            db.create('blog_comments', 'id', {
                name: 'id',
                type: 'int'
            }, {
                name: 'commenter',
                type: 'string'
            }, {
                name: 'comments',
                type: 'string'
            }, {
                name: 'postid',
                type: 'int'
            }, {
                name: 'created_on',
                type: 'string'
            });
        let lastid = db.dbObject['blog_posts']['lastid'];
        if(lastid < 1 ) {
            let imageSrc = 'image/default.jpg';
            let samplePost = `This is a sample post, stored in localStorage, you can delete it
                                or edit it, you can equally post yours. you can also check the
                                developer tools and call on db.dbObject to expose the storage object.`;
            let author = 'Fritz';
            let title = 'Sample post';

            let commentBody = 'A sample Comment Created at runtime.';
            db.from('Blog_posts').insert(['poster', 'title', 'slug', 'body', 'created_on', 'photo', 'comment_count'], [ author, title, this.getSlug(title), samplePost, `${new Date()}`, imageSrc, 1]);

            db.from('blog_comments').insert(['commenter', 'comments', 'postid', 'created_on'], [author, commentBody, 0, `${new Date()}`]);
        }
    },

    methods : {
        getSlug: function(title) {
            let date = new Date();
            let currentDate = `${date.getDate()}` + `${date.getMilliseconds()}`;
            title = title.trim().replace(/\s+/ig, '-');
            title = title + '-' + currentDate;
            return title;
        },
    },

});
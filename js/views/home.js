let homeView = {
    mixins : [homeUtils],
    data(){
        return {
            postBody : '',
            postTitle : '',
            poster : '',
            postPicture : '',
            avatar :'',
            posts : [],
            currentPage: 1,
            storageError: '',
        }
    },

    computed : {
        next: {
            get(){
                return Number(this.currentPage) + 1;
            }
        },

        prev: {
            get() {
                return Number(this.currentPage) - 1;
            }
        }
    },

    created: function () {
        document.title = 'Fritzify Blog - Simple localStorage library';
        this.currentPage = Object.keys(this.$route.query).length ? this.$route.query.page : 1;
        this.posts = this.filter([...this.getPosts()]);
    },

    methods : {
        rerender: function() {
            this.posts = this.filter([...this.getPosts()]);
            this.postBody = '';
            this.postTitle = '';
            this.poster = '';
            this.postPicture = '';
            return;
        },
        getSlug: function(title) {
            let date = new Date();
            let currentDate = `${date.getDate()}` + `${date.getMilliseconds()}`;
            title = title.trim().replace(/\s+/ig, '-');
            title = title + '-' + currentDate;
            return title;
        },

        createPost : function() {
            if(!this.postBody.length || !this.postTitle.length || !this.poster.length || !this.postPicture) {
                alert_modal.style.display = 'block';
                return false;
            }
            try {
                db.from('Blog_posts').insert(['poster', 'title', 'slug', 'body', 'created_on', 'photo'], [this.poster, this.postTitle, this.getSlug(this.postTitle), this.postBody, `${new Date()}`, this.postPicture]);
                this.rerender();
                modal.style.display = 'block';
            } catch(e) {
                storage_modal.style.display = 'block';
            }
            
        },
    },
    template : `
    <div class="wrapper"><div>
                <template class="center">
                <modal-message id="alert_modal" className="danger">Please Fill in all the forms to Post!</modal-message>
                <modal-message id="storage_modal" className="danger">Uploading failed! Database storage is full.</modal-message>
                <modal-message className="success">Blog post posted successfully!</modal-message>
                    <form action="javascript:void(0)" class="list-item">
                        <div class="postTitle">
                            <base-input
                            required
                            placeholder="Title"
                            label="Post title"
                            data-target="postTitle" v-bind:value="postTitle" @change="changePostTitle"
                            ></base-input>
                        </div>
                        <div class="postBody">
                            <base-textarea
                            required
                            placeholder="Create post"
                            rows="4"
                            cols="50"
                            data-target="postBody"
                            label="Post" v-bind:value="postBody"  @change="changePostBody"
                            ></base-textarea>
                        </div>
    
                        <div class="poster">
                            <base-input
                            required
                            placeholder="Your name"
                            label="Name" data-target="poster" v-bind:value="poster" @change="changePoster"
                            ></base-input>
                         </div>
    
                         <div class="postInput">
                            <label for="imgUploader">Upload picture </label>
                            <input type="file" id="imgUploader" @change="getPostPicture" data-target="postPicture">
                        </div>
                        <input type="submit" value="upload Post" class="action-btn bg-blue" @click="createPost">
                    </form>
                </template>
                <section class="content" id="blog_posts">
                    <!-- Blog Post -->
                    <div is='blog-post' v-for='(post, index) in posts' :post-title='post.title' :poster='post.poster' :post-date='timeAgo(post.created_on)' :avatar='post.photo' :post-body='post.body' :key="index" :slug="post.slug" :comment-count="post.comment_count">
                        {{post}}
                    </div>
                    <!-- End Blog Post -->
                    <!-- Start Pagination -->
                    <div class="pagination-container">
                        <ul class="pagination">
                            <li v-if="Number(currentPage) < pages(getPosts()).length" class="paginate-item">
                                <router-link :to="'?page=' + next" tag="a" class="paginate-link next bg-blue">
                                        Next
                                </router-link>
                            </li>
                            <template v-if="pages(getPosts()).length" class="pagination">
                                <li v-for="i in pages(getPosts())" class="paginate-item">
                                    <router-link :to="'?page=' + i"  tag="a" class="paginate-link bg-blue" disabled="currentPage == i ? true : false" :data-id="i" :class="currentPage == i ? 'active' : ''">
                                    {{i}}
                                    </router-link>
                                </li>
                            </template>
                            <li class="paginate-item" v-if="Number(currentPage) > Number(1)">
                                <router-link :to="'?page=' + prev" tag="a" class="paginate-link prev bg-blue">
                                        Prev
                                </router-link>
                            </li>
                        </ul>
                    </div>
                    <!-- End Pagination -->
                </section>
                </div></div>
           `,
}
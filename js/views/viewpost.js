let postView = {
    mixins : [homeUtils],
    data(){
        return {
            msg : 'testing',
            commenter : '',
            comment : '',
            comments : [],
            posts: [],
            currentPage: 1,
        }
    },
    computed: {
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
    created() {
        let slug = this.$route.params.slug;
        let query = db.from('blog_posts').where(['slug',  slug]).select(['*']).getFirst();
        this.posts = query;
        this.currentPage = Object.keys(this.$route.query).length ? this.$route.query.page : 1;
        if(!this.posts.length) {
            return this.$router.push('/404');
        }
        this.comments = this.filter([...this.getComments()]);
        document.title = this.posts[0]['title'];
    },
    methods : {
        submitComment(){
            event.preventDefault();
            let query = db.from('blog_posts').where(['id', this.posts[0]['id']]).select(['comment_count']).getFirst();
            let count_comment = query[0]['comment_count'];
            count_comment++;
            let insert_comment_count = db.from('blog_posts').where(['id', this.posts[0]['id']]).update(['comment_count'], [count_comment]);
            if(insert_comment_count) {
                db.from('blog_comments').insert(['commenter', 'comments', 'postid', 'created_on'], [this.commenter, this.comment, this.posts[0]['id'], `${new Date()}`]);
                modal.style.display = 'block';
                this.commenter = '';
                this.comment = '';
                this.comments = this.filter([...this.getComments()]);
            }
        },

        popDelete(event) {
            modal_d.dataset.id = event.target.dataset.id;
            modal_d.style.display = 'block';
        }

    },
    template : `
    <div class="single-post-wrapper" align="center"> 
        <section class="content" id="blog_posts" align="center">
        <input type="button" class="action-btn bg-blue" value="back" @click="goBack(-1)">
            <!-- Blog Post -->
            <article v-for='(post, index) in posts' class="row">
                <div class="card">
                    <div class="card-row">
                            <router-link :to="'/edit/' + post.id " tag="a" class="edit-post-perm">
                                Edit
                            </router-link>
                            <span v-if="post.edited">
                                <router-link :to="'/edithistory/' + post.id " tag="a" class="edit-post-perm">
                                View edit history
                                </router-link>
                            </span>
                        <h2>{{ post.title }}</h2>
                        <h5>posted by {{ post.poster }}, <span> {{ timeAgo(post.created_on) }} </span></h5>
                    </div>
                    <div class="post-thumbnail no-padd" :style="'background : url(' + post.photo +')'"></div>
                    <div class="card-row">
                        <p v-html="post.body"></p>
                    </div>
                </div>
                <div class="" align="left">
                    <form @submit="submitComment">
                        <input v-model="commenter" class="center" placeholder="Your name" id="name" type="text"><br>
                        <textarea class="post-input center" v-model="comment" placeholder="Your comment" id="comment" :data-postId="post.id"></textarea>
                        <input type="submit" value="Comment" class="action-btn bg-blue">
                    </form>
                </div>
                <div class="card" style="margin-top:30px;">
                <modal-message className="success">Comment posted successfully!</modal-message>
                    <h1 v-if="comments.length" class="bg-blue" style="padding:10px;">
                        Comments
                    </h1>
                    <modal-delete id="modal_d" className="delete-confirm">Delete comment?</modal-delete>
                    <div v-for='(comment, index) in comments'>
                        <div class="list-item" :key="index">
                        <h5>By {{ comment.commenter }}, <small><i> {{ timeAgo(comment.created_on) }} </i></small></h5>
                            <p v-html="comment.comments"></p>
                            <input type="button" value="Delete" :data-id="comment.id" @click="popDelete($event)" class="action-btn bg-red">
                        </div>
                    </div>
                </div>
                <!-- Start Pagination -->
                <div class="pagination-container">
                    <ul class="pagination">
                        <li v-if="Number(currentPage) < pages(getComments()).length" class="paginate-item">
                            <router-link :to="'?page=' + next" tag="a" class="paginate-link next bg-blue">
                                    Next
                            </router-link>
                        </li>
                        <template v-if="pages(getComments()).length" class="pagination">
                            <li v-for="i in pages(getComments())" class="paginate-item">
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
            </article>
            <!-- End Blog Post -->
        </section>
    </div>
    `
}
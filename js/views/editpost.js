let EditPost = {
    mixins : [homeUtils],
    data() {
        return {
            postBody : '',
            editedPost: '',
            staticPost:'',
            postId : null,
            title:'',
        }
    },

    created() {
        this.postId = this.$route.params.id;
        let query = db.from('blog_posts')
                      .where(['id', this.postId])
                      .select(['body', 'title']).getFirst()[0];
        this.postBody = query['body'];
        this.staticPost = this.postBody;
        this.title = query['title'];
        document.title = this.title;

    },

    computed : {
        EditedPost:{
            get() {
                if(this.postBody != this.staticPost) {
                    return true;
                }
                return false;
    
            }
         }
    },

    watch: {
        postBody: function(val) {
            this.editedPost = val;
        },
    },

    methods: {
        editPost : function() {
            if(!this.EditedPost) {
                return false;
            }
        let query = db.from('blog_posts')
                      .where(['id', this.postId])
                      .select(['edited_posts', 'edited_on']).getFirst()[0];
        let post_arr = query['edited_posts'];
        let date_arr = query['edited_on'];
        let __arr_p = (post_arr == null) ? [] : JSON.parse(post_arr);
        let __arr_d = (date_arr == null) ? [] : JSON.parse(date_arr);
        __arr_p.push(this.editedPost);
        __arr_d.push(new Date());
           let hey =  db.from('Blog_posts').where(['id', this.postId]).update(['body', 'edited', 'edited_posts', 'edited_on'], [this.postBody, true, JSON.stringify(__arr_p), JSON.stringify(__arr_d)]);
           this.staticPost = this.postBody;
           modal.style.display = 'block';
        },

        deletePost: function() {
            modal_d.style.display = 'block';
            modal_d.dataset.postid = this.postId;
        }
    },

    template: `
    <div class="card">
    <modal-delete id="modal_d" className="delete-confirm">Delete comment?</modal-delete>
    <modal-message className="success">Post Edited!</modal-message>
        <div class="card">
            <h3 class="center"> {{title}} </h3>
            <form action="javascript:void(0)">
                <div class="postBody">
                    <base-textarea
                    required
                    placeholder="Edit post"
                    rows="4"
                    cols="50"
                    data-target="postBody"
                    v-bind:value="postBody"  @change="changePostBody"
                    class="center"></base-textarea>
                </div>
                <input type="submit" value="Edit Post" @click="editPost" class="action-btn bg-blue center">
            </form>
            <input type="button" value="Delete" @click="deletePost()" class="action-btn delete bg-red">
            <input type="button" class="action-btn bg-blue" value="Back" @click="goBack(-1)">
        </div>
    </div>
    `
}
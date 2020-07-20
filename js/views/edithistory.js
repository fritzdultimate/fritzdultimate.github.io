let EditHistory = {
    mixins : [homeUtils],
    data() {
        return {
            posts: [],
            dates: [],
            postId : null,
            postBody : '',
        }
    },

    created() {
        document.title = 'Edit History';
        this.postId = this.$route.params.id;
        let query = db.from('blog_posts')
                      .where(['id', this.postId])
                      .select(['edited_posts', 'edited_on', 'body']).orderBy('edited_on', 'desc').getAll();
        this.postBody = query[0]['body'];
        delete query[0]['body'];
        let obj_v  = Object.values(query[0]);
        let posts = obj_v.map((el) => JSON.parse(el));
        this.posts = posts[0];
        this.dates = posts[1];
        this.dates = this.dates.reverse();
        // 
        

    },

    template: `
    <article class="card">
        <div class="">
            <h3 class="center">Edit History</h3>
            <div class="list-item" v-for='(post, i) in posts'>
                <div class="" :key="i">
                    <span style="background:#fff; color:#333; z-index:3333"> <small class="center" style="font-size:11px;"><i>Edited {{timeAgo(dates[i])}}</i></small></span><br>
                    {{post}}
                </div>
            </div>
            <div class="list-item" style="margin-top:50px;">
                <h4 class="blue"><i><u>Active Blog</u></i></h4>
                <p>
                {{postBody}}
                </p>
            </div>
            <input type="button" class="action-btn bg-blue" value="back" @click="goBack(-1)">
        </div>
    </article>
    `
}

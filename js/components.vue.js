Vue.component('base-textarea', {
    inheritAttrs: false,
    props: ['label', 'value'],
    computed : {
        changeValue : {
            get(){
                return this.value;
            }, 
            set(value){
                this.$emit('change', value);
            }
        }
    },
    template: 
    `
        <label>
            {{ label }}
            <textarea v-bind="$attrs" v-model='changeValue' class="post-input">
            </textarea>
        </label>

    `
});

Vue.component('base-input', {
    inheritAttrs: false,
    props: ['label', 'value'],
    computed : {
        changeValue : {
            get(){
                return this.value;
            }, 
            set(value){
                this.$emit('change', value);
            }
        }
    },
    template: 
    `
        <label>
            {{ label }}
            <input
                type="text"
                v-bind="$attrs"
                v-model="changeValue">
        </label>

    `
});

Vue.component('modal-message', {
    props : ['className'],

    methods:{
        hideModal(){
            let c = document.getElementsByClassName('popup');
            Array.from(c).forEach((el) => {
                el.style.display = 'none';
            })
        },
    },
    template: 
    `
        <div class="modal popup center" id="modal" style="display:none;">
            <div class="modal-content">
                <span class="close" @click="hideModal()">&times;</span>
                <p :class="className">
                    <slot></slot>
                </p>
            </div>
        </div>
    `
});

Vue.component('modal-delete', {
    props : ['className'],

    methods:{
        hideModal(){
            modal_d.style.display = 'none';
        },

        deleteComment(event) {
            if(+event.target.dataset.id) {
                if(+modal_d.dataset.id || +modal_d.dataset.id == 0){
                    let comment_id = modal_d.dataset.id;
                    let postid = db.from('blog_comments').where(['id', comment_id]).select(['postid']).getFirst()[0]['postid'];
                    db.from('blog_comments').where(['id', comment_id]).delete();
                    let com_count = db.from('blog_posts').where(['id', postid]).select(['comment_count']).getFirst()[0]['comment_count'];
                    com_count--;
                    db.from('blog_posts').where(['id', postid]).update(['comment_count'], [com_count]);
                    modal_d.dataset.id = undefined;
                    this.$router.go(0)
                    return true;
                } else if(+modal_d.dataset.postid != undefined || +modal_d.dataset.postid == 0) {
                    let post_id = modal_d.dataset.postid;
                    db.from('blog_posts').where(['id', post_id]).delete();
                    db.from('blog_comments').where(['postid', post_id]).delete();
                    modal_d.dataset.postid = undefined;
                    this.$router.push('/');
                    this.$router.go(0);
                }
            }
            modal_d.style.display = 'none';
        },
    },
    template: 
    `
        <div class="modal center" id="modal_d" style="display:bloc">
            <div class="modal-content">
                <span class="close_d" @click="hideModal()">&times;</span>
                <div class="container">
                    <p :class="className">
                        <slot></slot>
                    </p>
                    <div class="clearfix">
                        <button type="button" @click="deleteComment($event)" id="del_btn" data-id="1" class="cancelbtn"> Delete </button>
                        <button type="button" @click="deleteComment($event)" id="can_btn" data-id="0" class="deletebtn"> Cancel </button>
                    </div>
                </div>
            </div>
        </div>
    `
});

Vue.component('blog-post', {
    data(){
        return {
            bodyLimit : 120
        }
    },
    props: ['postTitle', 'poster', 'postDate', 'avatar', 'postBody', 'slug', 'commentCount'],
    created(){

    },
    computed : {
        slicePost(){
            return this.postBody.slice(0, this.bodyLimit);
        }
    },
    template: `
            <article class="row">
                <div class="card">
                    <div class="card-row">
                        <h2>{{ postTitle }}</h2>
                        <h5> {{ poster }}, <span> {{ postDate }} </span></h5>
                    </div>
                    <div class="post-thumbnail no-padd" :style="'background : url(' + avatar +')'"></div>
                    <div class="card-row">
                        <p v-if="postBody.length < bodyLimit" v-html="postBody"></p>
                        <div v-if="postBody.length > bodyLimit">
                            <p> 
                                {{slicePost}}...
                                <router-link class="read-more-link" tag="a" :to="'/posts/' + slug "> 
                                    Read more 
                                </router-link>
                            </p>
                        </div>
                        <router-link :to="'/posts/' + slug " tag="div" class="card-comment-cont">
                            <div> Comments </div>
                            <div>
                                <span class='comment-count'>
                                        {{ commentCount }}
                                </span>
                            </div> 
                        </router-link>
                    </div>
                </div>
            </article>`,
});
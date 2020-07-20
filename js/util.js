let homeUtils = {
    data(){
        return {
            MONTH_NAMES : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            limit: 5,
            currentPage: 1,
        }
    },

    computed: {
        getCurrentPage(){
            let query = this.$root.$route.query;
            return Object.keys(query).length ? query.page : 1;
        }
    },

    watch: {
        '$route' : function(route, from) {
            console.log(from, route)
            if((route.path.indexOf('/home') != -1 || route.path == '/') && (from.path !== '/home' || from.path !== '/') ){
                this.$router.go(0);
            }

        }
    },

    methods:  {
        getComments(){
            let Commentsquery = db.from('blog_comments').where(['postid', this.posts[0]['id']]).select(['*']).orderBy('id', 'desc').getAll();
            return Commentsquery
        },
        pages(from) {
            // return;
            return this.getPageLength((from).length, this.limit);
        },
        getPageLength(total, limit) {
            let i = 0;
            arr = [];
            if(total > limit && limit > 0) {
                while(total > limit) {
                    total = total - limit;
                    i++;
                }
                for (let counter =1; counter <= i + 1; ++counter) {
                    arr[arr.length] = counter;
                }
                return arr;
            } else {
                return [];
            }
        },
        filter(products) {
            return products.slice((this.currentPage === 1 ? this.currentPage - 1 : (this.currentPage - 1) * this.limit)).slice(0, this.limit);
        },
        changePostBody(value){
            this.postBody = value;
        },
        changePostTitle(value){
            this.postTitle = value;
        },
        changePoster(value){
            this.poster = value;
        },
        
        getPostPicture(event){
            let that = this;
            let file = event.currentTarget.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.addEventListener('load', (event) => {
                const image = new Image();
                image.src = event.target.result;
                setTimeout(() => {
                    const canvas = document.createElement('canvas');
                    canvas.width = image.naturalWidth;
                    canvas.height = image.naturalHeight;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(image, 0, 0);
                    ctx.canvas.toBlob((blob) => {
                        const newFile = new File([blob], file.name, {
                            type : 'image/jpeg',
                            lastModified : Date.now(),
                        });
                        const reader2 = new FileReader();
                        reader2.readAsDataURL(newFile);
                        reader2.addEventListener('loadend', function(el){
                            that.postPicture = event.target.result;
                        });
                    }, 'image/jpeg', 0.2);
                });
            });
        },

        getPosts(){
            let query = db.from('blog_posts').select(['*']).orderBy('id', 'desc').getAll();
            return query;
        },

        getformattedDate(date, preformattedDate = false, hideYear = false) {
            const day = date.getDate();
            const month = this.MONTH_NAMES[date.getMonth()];
            const year = date.getFullYear();
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let ap = "AM";

            if( minutes < 10) {
                minutes = `0${ minutes }`;
            }

            ap = hours > 12 ? "PM" : ap;

            if( hours > 12 ) {
                hours -=12;
            } else if(hours == 0){
                hours = 12
            } 

            if(preformattedDate) {
                return `${ preformattedDate }, at ${ hours }:${ minutes } ${ ap}`;
            }

            if( hideYear ) {
                return `${ day }. ${ month } at ${ year }. at ${ hours }:${ minutes }: ${ap}`;
            }
         },

        timeAgo(dateParam) {
            if(!dateParam) {
                    return null;
            }

            const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
            const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 100
            const today = new Date();
            const yesterday = new Date(today - DAY_IN_MS);
            const seconds = Math.round((today - date) / 1000);
            const minutes = Math.round(seconds / 60);
            const isToday = today.toDateString() === date.toDateString();
            const isYesterday = yesterday.toDateString() === date.toDateString();
            const isThisYear = today.getFullYear() === date.getFullYear();

            if(seconds < 5 ) {
                return 'just now';
            } else if (seconds < 60 ) {
                return `${ seconds } seconds ago`;
            } else if(seconds < 90) {
                return `about a minute ago`;
            } else if(minutes < 60 ) {
                return `${ minutes } minutes ago`;
            } else if(isToday) {
                return this.getformattedDate(date, 'Today');
            } else if(isYesterday) {
                return this.getformattedDate(date, 'Yesterday');
            } else if(isThisYear) {
                return this.getformattedDate(date, false, true);
            }

            return this.getformattedDate(date);
        },
        goBack(para){
            this.$router.go(para);
        },
    }
}
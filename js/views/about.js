let About = {
    data() {
        return {

        }
    },

    created(){
        document.title = 'About the project';
    },
    methods : {
        goBack(para){
            this.$router.go(para);
        },
    },
    template: `
    <div>
        <div class="card about-container">
        <div><input type="button" class="action-btn bg-blue" value="Back" @click="goBack(-1)"></div>
            <span class="about-hashtag">
                <a href="#project">#About the project </a>
            </span>
            <span class="about-hashtag">
                <a href="#dev">#About the Developer </a>
            </span>

            
            <div class="about-project">
                <h3 id="project">
                    About the project
                </h3>
                <article class="about-body">
                    <p>
                        <em class="emphasis">Fritzify</em> is a simple blog created to illustrate the <em class="emphasis">Javascript</em> Database library "<em class="emphasis">Localdb</em>" created on the <em class="emphasis">localStorage</em> Api.
                    </p>
                    <p>
                        You can perform reat time <em class="emphasis"> CRUD </em> action with <em class="emphasis">Localdb</em>, instead of the normal <em class="emphasis">localStorage.getItem(name, value)</em>, you would instead call on the library method "<code class="emphasis">db.from.(table name).select([...column names]).getFirst() </code>". <br>
                        There are just more than one method on the library.
                        
                            <code class="emphasis">db.from(table name)</code> - the table to select from.

                            <code class="emphasis">from(table).select([array of columns])</code> - select from the columns provided, you can call on <code class="emphasis">from(table).select(['*'])</code> to select all colums.

                            <code class="emphasis">from.create(table, primary key, object)</code> - this method creates the table with the first parameter, takes the second parameter as the primary key, and the provide primary must be available in the provided column names.
                            the rest of the parameter must be an object, where each object must contain some important keys, 'name' (column name), 'type' (type of value to accept, e.g. String, int or interger, boolean etc). 
                            the key 'default' contains the default value for each column, results to 'null' if not provided.
                            E.t.c.....
                        
                    </p>
                    <p>
                        Please note that the select method returns a complex object, so you must call on <code class="emphasis"> .getAll(), getFirst() or getLast() </code> on them to return an array of object, where the object key is the column and the value, the column value.
                    </p>
                    <p>
                        There many others the library can do, like ordering your results, using wildcards, with the help of <code class="emphasis">.like()</code> etc.
                    </p>

                    <p>
                        As you can see, <code class="emphasis">localStorage</code> is now more than just storing a string, you can now turn it into a local database, :D actually, its for client use only. Your database can only be accessed by you only, or the person using your browser on the same device. 
                    </p>

                    <p>
                        Please note that this is an experimental project.
                    </p>
                </article>

            </div>
            <div class="about-dev">
                <article class="about-body">
                    <h3 id="dev">
                        About the Developer
                    </h3>
                <div class="p">                    
                    <img src="image/dev.jpg" class="dev-image">
                        Nwosu Darlington Chukwuemeka is male junior web developer who loves learning new things, he is a self thought dev, an autodidact.
                        <h3>
                            Languages he currently codes with
                        </h3>
                        <ul>
                            <li>JavaScript, JQuery, VueJs</li>
                            <li>PHP, CodeIgniter</li>
                        </ul>
                        <h5>
                            Contact Darlington On:
                        </h5>
                        <ul>
                            <li>Facebook - <a href="http://facebook.com/fritz.darlington">Fritz Darlington</a> or search Fritz Darl</li>
                            <li>Twitter - <a href="http://twitter.com/fritzdultimate">@fritzdultimate</a></li>
                            <li>Github - <a href="http://github.com/fritzdultimate">@fritzdultimate</li>
                        </ul>
                    </div>
                </article>
            </div>
        </div>
    </div>
    `
}
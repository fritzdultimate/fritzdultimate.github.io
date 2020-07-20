let NotFound = {
    data() {
        return {

        }
    },

    created() {
        document.title = '404 - Not Found';
    },

    template: `
        <div class="card not-found">
        <div><input type="button" class="action-btn bg-blue" value="Back" @click="goBack(-1)"></div>
            <h5> The link your looking for does not exist or has expired! </h5>
        </div>
    `
}
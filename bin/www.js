/**
 * Created by lyy on 2017/6/7.
 */
let app = require( '../site/app');
console.log(__dirname);
app.listen(3000, () => {
    console.log('listening on port 3000');
});
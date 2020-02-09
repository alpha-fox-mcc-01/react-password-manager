function generatePassword( length ) {
    var string = "abcdefghijklmnopqrstuvwxyz";
    var numeric = '0123456789';
    var specialChars = '!@#$%^&*()_+~`|}{[]\:;?><,./-=';
    var password = "";
    var character = "";
    while( password.length < length ) {
        let item1 = Math.floor(string.length * Math.random()*Math.random());
        let item2 = Math.floor(numeric.length * Math.random()*Math.random());
        let item3 = Math.floor(specialChars.length * Math.random()*Math.random());
        let prePass = ''
        prePass = string.charAt(item1);
        prePass = (password.length%2==0)?(prePass.toUpperCase()):(prePass);
        character += prePass;
        character += numeric.charAt(item2);
        character += specialChars.charAt(item3);
        password = character;
    }
    password=password.split('').sort(function(){return 0.5-Math.random()}).join('');
    return password.substr(0,length);
}
 export default generatePassword
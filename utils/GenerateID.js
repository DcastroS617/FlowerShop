const GenerateID = () => {
    let chars = 'ABCDEFGHIJKLMN1234567890'
    let pass = []   
    for (let i = 0; i < 9; i++) {
        let ran = Math.floor( Math.random() * (chars.length - 1))
        pass.push(chars[ran])      
    }
    return pass.join('')
}

module.exports = GenerateID
const util = Util
const ID_CONTENT = 'content'
const ID_BTN_PLAY = 'play'
const ID_MSG = 'msg'
const CLASS_INVI = 'invisible'
const ID_LOADING = 'loading'
const ID_COUNT = 'count'
const ID_BTN_SHOW_ALL = 'showAll'

const MSGS = {
    success:{
        text: 'Right combination',
        class: 'alert-success'
    },
    erro:{
        text: 'Wrong combination',
        class: 'alert-danger'
    }
}

class GameScreen{
    static GetCodHtml(item){
        return `
        <div class="col-md-3">
            <div class="card" style="width: 50%;"onclick="window.verifySelect('${item.id}', '${item.name}')">
            <img src="${item.img}" name="${item.name}" class="card-img-top" alt="...">
            </div>
            <br>
        </div>    
        `
    }

    static configureVerifySelectBtn(funcOnClick){
        window.verifySelect = funcOnClick
    }

    static changeContentHtml(codHtml){
        const content = document.getElementById(ID_CONTENT)
        content.innerHTML = codHtml
    }

    static generateStringHtmlforImg(itens){
        //cada item -> getCodHTML
        //ao final vai juntar todos itens
        return itens.map(GameScreen.GetCodHtml).join('')
    }

    static updateImgs(itens){
        const codHtml = GameScreen.generateStringHtmlforImg(itens)
        GameScreen.changeContentHtml(codHtml)
    }

    static configurePlayBtn(funcOnClick){
        const btnJogar = document.getElementById(ID_BTN_PLAY)
        btnJogar.onclick = funcOnClick
    }

    static showElements(nameOfElement, img){
        const htmlItens = document.getElementsByName(nameOfElement)
        htmlItens.forEach(item => (item.src = img))
    }

    static async showMsg(success = true){
        const element = document.getElementById(ID_MSG)
        if(success){
            element.classList.remove(MSGS.erro.class)
            element.classList.add(MSGS.success.class)
            element.innerText = MSGS.success.text
        } else {
            element.classList.remove(MSGS.success.class)
            element.classList.add(MSGS.erro.class)
            element.innerText = MSGS.erro.text
        }
        element.classList.remove(CLASS_INVI)
        await util.timeout(1000)
        element.classList.add(CLASS_INVI)
    }

    static showLoading(showSpin = true){
        const loading = document.getElementById(ID_LOADING)
        if(showSpin){
            loading.classList.remove(CLASS_INVI)
            return
        }
        loading.classList.add(CLASS_INVI)
    }

    static startCount(){
        let untilCount = 3
        const countElement = document.getElementById(ID_COUNT)
        const identifyCount = '$$count'
        const defaultText = `Starting in ${identifyCount} sec.. `
        const updateText = () =>
            (countElement.innerHTML = defaultText.replace(identifyCount, untilCount--))
            updateText()
            const idOfInterval = setInterval(updateText, 1000)
            return idOfInterval
    }

    static clearCounter(idOfInterval){
        clearInterval(idOfInterval)
        document.getElementById(ID_COUNT).innerHTML = ''
    }

   static configureShowAllBtn(funcOnClick){
        const btnShowAll = document.getElementById(ID_BTN_SHOW_ALL)
        btnShowAll.onclick = funcOnClick
    }
}
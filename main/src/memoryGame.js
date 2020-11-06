class MemoryGame{
    constructor({ screen, util }){
        this.screen = screen
        this.util = util

        this.startsElements = [
            {img: '../files/mountain.png', name: 'mountain'},
            {img: '../files/grass.png', name: 'grass'},
            {img: '../files/river.png', name: 'river'},
            {img: '../files/waterfall.png', name: 'waterfall'},
        ]

        this.defaultIcon = '../files/default.png'
        this.hideElements = []
        this.selectedElements = []

    }

    initialize(){
        this.screen.updateImgs(this.startsElements)
        this.screen.configurePlayBtn(this.play.bind(this))
        this.screen.configureVerifySelectBtn(this.verifySelect.bind(this))
        this.screen.configureShowAllBtn(this.showAllElements.bind(this))
    }

    async shuffle(){
        const copies = this.startsElements.concat(this.startsElements)
        .map(item =>{
            return Object.assign({}, item, {id: Math.random()/0.5})})
        .sort(()=>Math.random() - 0.5)

        this.screen.updateImgs(copies)
        this.screen.showLoading()
        const idOfInterval = this.screen.startCount()
        await this.util.timeout(3000)
        this.screen.clearCounter(idOfInterval)
        this.hideTheElements(copies)
        this.screen.showLoading(false)
    }

    hideTheElements(startsElements){
        const hideElements = startsElements.map(({name, id}) => ({
            id,
            name,
            img: this.defaultIcon
        }))

        this.screen.updateImgs(hideElements)
        this.hideElements = hideElements
    }

    showElements(nameOfElement){
        const { img } = this.startsElements.find(({name}) => nameOfElement === name)
        this.screen.showElements(nameOfElement, img)
    }

    verifySelect(id, name){
        const item = {id, name}
        const selectedElements = this.selectedElements.length
        switch (selectedElements) {
            case 0:
                this.selectedElements.push(item)
                break;
            case 1:
                //primeiro item do array
                const [ option1 ] = this.selectedElements
                this.selectedElements = []
                if(option1.name === item.name && option1.id !== item.id){
                    this.showElements(item.name)
                    this.screen.showMsg()
                    return
                }
                this.screen.showMsg(false)

                break
        }
    }

    showAllElements(){
        const hideElements = this.hideElements
        for(const elem of hideElements){
            const { img } = this.startsElements.find(item => item.name === elem.name)
            elem.img = img
        }
        this.screen.updateImgs(hideElements)
    }

    play(){
        this.shuffle()
    }
}
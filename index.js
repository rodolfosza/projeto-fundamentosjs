function onLoad(){
    const dependencies = {
        screen: GameScreen,
        util: Util
    }

    const memoryGame = new MemoryGame(dependencies)
    memoryGame.initialize()
}

window.onload = onLoad

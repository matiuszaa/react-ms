import {
    GameResponse
} from "../viewModels/GameViewModel"

export const getGames = async (
  ): Promise<GameResponse []> => {
    // Mocked API call (replace with actual API call)
    const mockedResponse: GameResponse[] = [{
      gameId: 21,
      gameName: "gay chicken",
    }, 
    {
        gameId: 37,
        gameName: "game 2"
    }];
    
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Mocked API Response:", mockedResponse);
        resolve(mockedResponse);
      }, 1000);
    });
  };
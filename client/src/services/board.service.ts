import axiosConfig from "./axios.service";

const BOARD = "/board";

class BoardService {
  createBoard = async (board: any) => {
    return await axiosConfig.post(`${BOARD}`, board);
  };

  getAllBoards = async (projectId: string) => {
    return await axiosConfig.get(`/project/${projectId}${BOARD}`);
  };

  getBoardById = async (id: string) => {
    return await axiosConfig.get(`${BOARD}/${id}`);
  };
  updateBoard = async (id: string, board: any) => {
    return await axiosConfig.put(`${BOARD}/${id}`, board);
  };
  deleteBoard = async (id: string) => {
    return await axiosConfig.delete(`${BOARD}/${id}`);
  };
}

export default new BoardService();

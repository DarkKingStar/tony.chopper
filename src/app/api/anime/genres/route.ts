import { ResponseEntity } from "@/utils/response";
import { ANIME } from "@/utils/fetcher";
import { HTTP_STATUS_CODE } from "@/utils/StatusCode";


export const GET = async () => {
    try {
      const data = await ANIME.fetchGenres();
      return ResponseEntity(data , HTTP_STATUS_CODE.success);
    } catch (error:any) {
        return ResponseEntity({ message: error.message }, HTTP_STATUS_CODE.bad_request);
    }
}
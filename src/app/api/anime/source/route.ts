import { ResponseEntity } from "@/utils/response";
import { ANIME } from "@/utils/fetcher";
import { HTTP_STATUS_CODE } from "@/utils/StatusCode";
import { NextRequest } from "next/server";

interface EpisodeSourePayload {
    id: string;
}

export const POST = async (req : NextRequest) => {
    try {
      // Parse JSON from the request body
      const body: EpisodeSourePayload = await req.json();
      if(body == null || body.id == null){
        return ResponseEntity({message: "Invalid request body", body:{
          id: "STRING"
        }}, HTTP_STATUS_CODE.bad_request);
      }
      const data = await ANIME.fetchEpisodeSources(body.id);
      return ResponseEntity(data , HTTP_STATUS_CODE.success);
    } catch (error:any) {
        return ResponseEntity({ message: error.message }, HTTP_STATUS_CODE.bad_request);
    }
}
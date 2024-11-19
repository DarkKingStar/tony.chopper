import { ResponseEntity } from "@/utils/response";
import { ANIME } from "@/utils/fetcher";
import { HTTP_STATUS_CODE } from "@/utils/StatusCode";
import { NextRequest } from "next/server";


const TYPE = {
    SPOTLIGHT: "spotlight",
}

interface TypePayload {
    type: string;
}


export const POST = async (req : NextRequest) => {
    try {
      // Parse JSON from the request body
      const body:TypePayload = await req.json();
      if(body == null || body.type == null){
        return ResponseEntity({message: "Invalid request body", body:{
          type: "STRING"
        }}, HTTP_STATUS_CODE.bad_request);
      }
      let data: any = null;
      switch (body.type) {
          case TYPE.SPOTLIGHT:
          data = await ANIME.fetchSpotlight();
          break;
      }
      return ResponseEntity(data , HTTP_STATUS_CODE.success);
    } catch (error:any) {
        return ResponseEntity({ message: error.message }, HTTP_STATUS_CODE.bad_request);
    }
}
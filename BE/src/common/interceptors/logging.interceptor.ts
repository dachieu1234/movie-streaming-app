import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body, query, params } = request;

    const now = Date.now();
    console.log(`➡️ [${method}] ${url}`);
    if (Object.keys(query).length) console.log("   🔹 Query:", query);
    if (Object.keys(params).length) console.log("   🔹 Params:", params);
    if (Object.keys(body).length) console.log("   🔹 Body:", body);
    console.log("------------------------------------------------------");
    
    return next.handle().pipe(
        tap((data) => {
            console.log("------------------------------------------------------");
            console.log(
            `⬅️ [${method}] ${url} - ${Date.now() - now}ms`,
            );
            console.log("   🔹 Response:", data);
        }),
    );
  }
}

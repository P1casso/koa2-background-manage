const testService= require('../Service/testService');
module.exports = {
    getNewsByTypeNum:async (ctx,next)=>{
        try{
            const newsTypeId = ctx.params.newsTypeId;
            const newsNum = ctx.params.newsNum;
            if (!isNaN(newsTypeId)&&!isNaN(newsNum)){
                const result = await testService.getNewsByTypeNum(parseInt(newsTypeId),parseInt(newsNum));
                if (result){
                    ctx.body={
                        code:200,
                        data:result,
                        msg: "success"
                    };
                }
            }else {
                ctx.body={
                    code:400,
                    msg: "参数错误"
                };
            }

        }catch (e) {
            ctx.body={
                code:500,
                msg: "服务器错误"
            };

        }

    }
}
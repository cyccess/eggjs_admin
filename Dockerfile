#基础镜像
FROM node:8.0.0
#定义参数
ARG source
#设置工作目录
WORKDIR /wwwroot
RUN mkdir -p /wwwroot/log
#把所有文件复制到工作目录
COPY . /wwwroot

#暴露端口
EXPOSE 7001

#设置本地时间
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai  /etc/localtime

#程序入口 
CMD ["sh", "./startup.sh"]
 
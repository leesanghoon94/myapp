#!/bin/bash

# NFS 서비스 활성화
systemctl enable rpcbind
systemctl enable nfs-server

# rpcbind와 NFS 데몬 실행
systemctl start rpcbind
systemctl start nfs-server

# 무한 대기 상태로 진입하여 컨테이너가 계속 실행되도록 함
tail -f /dev/null


#!/usr/bin/env sh

apk add --update curl && rm -rf /var/cache/apk/*

#===========================================
# altera variaveis de ambiente
# copia arquivos js para pasta temporária
mkdir /dist/template_js
cp /dist/js/* /dist/template_js
# substitui todas as variaveis por suas respectivas variáveis de ambiente
for arq in `ls /dist/template_js`;
do
  envsubst '${API_DS_ACESSO_URL}
			      ${API_DS_ACESSO_USER}
			      ${API_DS_ACESSO_PASS}' < "/dist/template_js/$arq" > "/dist/js/$arq"
done
#===========================================
# inicia o nginx
nginx -g "daemon off;"

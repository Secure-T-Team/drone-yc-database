# Drone plugin for create dev db in Yandex Cloud

example drone step:

```yaml
- name: create dev db
  image: bibasoft/drone-yc-database
  settings:
    yc_api_key: 'yc_api_key'
    yc_service_account_id: 'yc_service_account_id'
    yc_key_id: 'yc_key_id'
    db_cluster_id: 'cluster-id'
    db_user: 'postgres'
    db_host: 'host'
    db_port: 5432'
    db_password: 'qwerty'
    restore_db_name: 'dev'

```

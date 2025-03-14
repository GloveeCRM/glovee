Replace the following with s3Presiger calls:

- profile_picture_upload_url
- application_file_upload_url
- form_answer_file_upload_url

Secure the presigner:

- Now everyone can make a request and get a url if they have file info.
- Add a layer of security using api key between front and s3 presigner
- Add another layer of security for sending users JWT and verifying if user has access

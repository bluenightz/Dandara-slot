# Dandara-slot

เขียนโปรแกรมรับค่าจากอุปกรณ์ Hardware ที่ใช้ในรายการเกมโชว์
เพื่อแสดงขึ้นบนหน้าจอ led 
ตัวอย่างการใช้งานจริง 
https://youtu.be/Lji_88sZ0V4?t=1051

![บริเวณที่ควบคุมด้วย javascript](https://lh3.googleusercontent.com/Xc8vH_4GxDssojfbCFJnOK13u4AX1VRjaMY5UiZ6__iXWn_ujDUW9Lvo_oGUqbeQJX4_vccaVN7LKF-DWdMbAeoFlaVZZSOXul_AuUfC_jeORh5Z1F6Sv0roy0ogUSYgnzrsCc47IWZzQvB1h8k690NtbbGWSKMfui96hkrKY4zSsFXDUi0mkTMGaODF4PVjI8px16bPh8HUcBM7wMj7imsi4jjmbnaBFNItEiSVksDabUm12oGTVgXfh8KgRJuJn5s_0lnqHYK_U1m1WJ40aO_Gnndq9ugO5Pdfy2V9FYIX1yXOgBIMsR8u_WnGXYodTBer-nhIXhANfQG1t0XlVa_8AWjd-ysKUxKqkKscFiHuTh17OPlUEpQ3ibgRKMDoV0CWcu9OIh291SDifXqRdZpLJ5EDk5T9doOD_BP5q9dwL3Pegr0ot_-_rNHt4PEfz7xSvOiprpAbAa5W9r_GyE1-99zKYYRRdjK0NCkKDipJFzfRtRkl2ILn4HBAlpLpbBSC8ugkFLww5LxV3E6Xa0AdsIQ_16QvdSxRNI_BniBDljv02mh6RDGuCwKWwKMRv5u3IWI1andsM3qd6ssj0CONBONLyyWbb02e3Nt05z5fzQFDqdFNe2x1tLL9JiJc872h1URuwyuTOUlR20GDocNv9qK-sLD3FCwNRdF7fcE4Vkr895U-JPHlAFmQqa7Fqbn46moSWq4G_DR8sHL1gy1Q0Q=w800-h418-no)

---
## หลักการทำงาน

กรรมการสามท่านจะคอยเลื่อนอุปกรณ์ hardware เพื่อทำการให้คะแนะผู้ร้องเพลง\
ค่าที่ผ่านการคำนวนก็จะสามารถเข้าไป GET มาได้โดยผ่านทาง API\
จากนั้นนำค่านั้นมาเล่นเป็น animation

---
## จัดการ animation ด้วย
### jQuery
### GreensockJS

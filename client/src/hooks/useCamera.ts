import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
const takePhoto = () => {
    return Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100
    });
};

export function useCamera() {
    return {
        takePhoto
    }
}
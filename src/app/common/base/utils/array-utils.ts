export const sortAndtoString = (array: String[]): string => {
    array.sort((a,b) => {
        if(a<b){
            return -1;
        }
        if(a>b){
            return 1;
        }
        return 0
    })
    return array.toString();

}
const getValue = (item: any,  fieldName: string): string => {
    fieldName.split(".").forEach((e: any) => (item = item[e]));
    return item;
}
const setIdInString = (item: any, idFields: string[]): any => {
    let idStr = "";
    idFields.forEach((idFields) => {
        const partialId = getValue(item, idFields);
        if (idStr) idStr += "_"
        idStr += partialId
    });
    return {
        ...item,
        _id: idStr,
    }

}
export const match = (idFields: string[], source: any[], target: any[]) => {
    const _source = source.map((item) => setIdInString(item, idFields));
    const _target = target.map((item) => setIdInString(item, idFields));

    const loopSize = _source.length > _target.length ? _source.length : _target.length;

    const usedTargetItemIds: string[] = [];

    let matchedArray: any[] = [];
    for(let i = 0; i < loopSize; i++){
        const sourceItem = _source[i];
        if(sourceItem){
            const matchedTarget = _target.find((item) => item._id == sourceItem._id);

            matchedArray.push({
                source: sourceItem,
                target: matchedTarget,
            });
            if(matchedTarget) usedTargetItemIds.push(matchedTarget._id);
        } else {
            const targetItem = _target[i];

            matchedArray.push({
                source: null,
                target: targetItem,
            });
            usedTargetItemIds.push(targetItem._id);
        }
    }
    _target.forEach(item => {
        if (usedTargetItemIds.indexOf(item._id) <0){
            matchedArray.push({
                source: null,
                target: item,
            });
        }
    })   
    return matchedArray;
}
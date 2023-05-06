% Parameters :
%    melodic_filepath : string | Example: '/home/jen/Documents/0_Input_ICA/melodic_IC.dr'
%    tr : number | Threshhold, example: 0.42
%    normalisation : boolean | Example: 1
%    matrixType : string | Example: ['corr'|
%    colout : String | Example: ["jet"|
%

function createMatrix(melodic_filepath, tr, normalisation,matrixType, colour, matrixTitle, filePath)
    ts = nets_load(melodic_filepath, tr, normalisation)
    net_matrix = nets_netmats(ts,1,matrixType)
    corr=reshape(net_matrix,ts.Nnodes,ts.Nnodes)
    corr(corr==0)=NA
    imagesc(corr)
    colormap(colour)
    title(matrixTitle)
    csvwrite([filePath,"/",matrixTitle, ".csv"],corr)
    print([filePath,"/",matrixTitle,".jpg"])
    close all force
end





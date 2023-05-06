import oct2py as octave


def add_octave(melodic_filepath: str, tr: float, normalisation: bool, matrix_type: str, colour: str, matrix_title: str, dir_path: str):
    print("I entered brain Matrix")
    oct = octave.Oct2Py()
    oct.addpath('/home/jen/fsl/FSLNets')
    oct.addpath('/home/jen/octave/statistics-1.5.4')
    oct.addpath('/home/jen/PycharmProjects/predprodalzheimer-scratch/fsl_frontend/fsl_backend/scripts')
    try:
        oct.createMatrix(melodic_filepath, tr, normalisation, matrix_type, colour, matrix_title, dir_path)
        oct.exit()
    except Exception as e:
        print(str(e))
